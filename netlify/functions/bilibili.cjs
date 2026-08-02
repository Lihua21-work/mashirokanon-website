const crypto = require('crypto');

const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
  61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
  36, 20, 34, 44, 52
];

function getMixinKey(orig) {
  let temp = '';
  mixinKeyEncTab.forEach(n => {
    if (orig[n]) temp += orig[n];
  });
  return temp.slice(0, 32);
}

function encWbi(params, imgKey, subKey) {
  const mixinKey = getMixinKey(imgKey + subKey);
  const currTime = Math.round(Date.now() / 1000);
  const chrFilter = /[!'()*]/g;
  const query = [];
  params.wts = currTime;
  
  Object.keys(params).sort().forEach(key => {
    let val = params[key].toString();
    val = val.replace(chrFilter, '');
    query.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
  });

  const queryStr = query.join('&');
  const wbiSign = crypto.createHash('md5').update(queryStr + mixinKey).digest('hex');
  return queryStr + '&w_rid=' + wbiSign;
}

exports.handler = async function(event, context) {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const ROOM_ID = '21402309';
  const UID = '401480763';

  // 1. 获取直播间开播状态
  let liveStatus = {
    isLive: false,
    title: '目前处于离线/准备中',
    online: 0,
    roomUrl: `https://live.bilibili.com/${ROOM_ID}`
  };

  try {
    const liveRes = await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${ROOM_ID}`);
    if (liveRes.ok) {
      const liveData = await liveRes.json();
      if (liveData && liveData.code === 0 && liveData.data) {
        liveStatus = {
          isLive: liveData.data.live_status === 1,
          title: liveData.data.title || '真白花音的直播间',
          online: liveData.data.online || 0,
          roomUrl: `https://live.bilibili.com/${ROOM_ID}`
        };
      }
    }
  } catch (e) {
    console.error('Fetch live room error:', e.message);
  }

  // 2. 服务端尝试通过 B 站官方 Wbi 签名获取动态
  let dynamics = [];
  try {
    const fetchHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': `https://space.bilibili.com/${UID}`
    };

    if (process.env.BILI_SESSDATA) {
      fetchHeaders['Cookie'] = `SESSDATA=${process.env.BILI_SESSDATA}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const navRes = await fetch('https://api.bilibili.com/x/web-interface/nav', { headers: fetchHeaders, signal: controller.signal });
    const navJson = await navRes.json();
    const imgUrl = navJson.data.wbi_img.img_url;
    const subUrl = navJson.data.wbi_img.sub_url;
    const imgKey = imgUrl.slice(imgUrl.lastIndexOf('/') + 1, imgUrl.lastIndexOf('.'));
    const subKey = subUrl.slice(subUrl.lastIndexOf('/') + 1, subUrl.lastIndexOf('.'));

    const signedQuery = encWbi({ host_mid: UID }, imgKey, subKey);
    const dynUrl = `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?${signedQuery}`;

    const dynRes = await fetch(dynUrl, { headers: fetchHeaders, signal: controller.signal });
    const dynData = await dynRes.json();
    clearTimeout(timeoutId);

    if (dynData.code === 0 && dynData.data && dynData.data.items) {
      dynamics = dynData.data.items.slice(0, 5).map((item, idx) => {
        const module_dynamic = item.modules?.module_dynamic;
        const module_author = item.modules?.module_author;
        
        let text = module_dynamic?.desc?.text || module_dynamic?.major?.opus?.summary?.text || '';
        if (!text && module_dynamic?.major?.archive) {
            text = module_dynamic.major.archive.title;
        }

        let date = '最新';
        if (module_author?.pub_ts) {
          const d = new Date(module_author.pub_ts * 1000);
          date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        }

        return {
          id: `server-dyn-${idx}-${Date.now()}`,
          title: text.includes('视频') ? '视频投稿' : 'B站动态',
          content: text.trim() || '分享了内容',
          date: date,
          url: `https://space.bilibili.com/${UID}/dynamic`,
          tag: text.includes('视频') ? '视频投稿' : 'B站动态',
          tagType: text.includes('视频') ? 'success' : 'primary',
          type: 'primary',
          isRealtime: true
        };
      });
    }
  } catch (err) {
    console.error('Wbi API fetch error:', err.message);
  }

  const result = {
    success: true,
    live: liveStatus,
    dynamics: dynamics
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(result)
  };
};
