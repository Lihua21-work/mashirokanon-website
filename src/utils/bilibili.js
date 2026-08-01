/**
 * Bilibili 数据拉取客户端工具
 */

/**
 * 统一获取 B 站数据（包含直播状态与最新动态）
 */
export async function fetchBilibiliData() {
  try {
    const res = await fetch('/api/bilibili')
    if (res.ok) {
      const data = await res.json()
      if (data && data.success) {
        return data
      }
    }
  } catch (e) {
    console.warn('[API Serverless Error]:', e.message)
  }
  return null
}

/**
 * 获取真白花音 B 站直播间状态
 */
export async function fetchLiveStatus() {
  const apiRes = await fetchBilibiliData()
  if (apiRes && apiRes.live) {
    return apiRes.live
  }

  try {
    const res = await fetch('https://api.live.bilibili.com/room/v1/Room/get_info?room_id=21402309')
    if (res.ok) {
      const liveData = await res.json()
      if (liveData && liveData.code === 0 && liveData.data) {
        return {
          success: true,
          isLive: liveData.data.live_status === 1,
          title: liveData.data.title || '真白花音的直播间',
          online: liveData.data.online || 0,
          roomUrl: 'https://live.bilibili.com/21402309'
        }
      }
    }
  } catch (e) {}

  return {
    success: false,
    isLive: false,
    title: '目前处于准备中/未开播',
    online: 0,
    roomUrl: 'https://live.bilibili.com/21402309'
  }
}

/**
 * 获取真白花音的最新动态列表
 */
export async function fetchUserDynamics() {
  // 仅使用 API 云函数实时抓取的内容
  const apiRes = await fetchBilibiliData()
  if (apiRes && apiRes.dynamics && Array.isArray(apiRes.dynamics)) {
    return apiRes.dynamics.slice(0, 5)
  }

  // 完全放弃假数据兜底，如果云端抓不到，直接返回空数组
  return []
}
