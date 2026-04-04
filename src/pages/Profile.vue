<template>
  <div class="profile">
    <div class="container">
      <h1 class="page-title">个人资料</h1>
      
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <el-card class="avatar-card">
            <img src="@/assets/images/avatar.jpg" alt="眞白花音头像" class="avatar" />
            <h2>眞白花音</h2>
            <p>ましろ かのん / Mashiro Kanon</p>
            <p>昵称：白菜</p>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="16">
          <el-card class="info-card">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="性别">女</el-descriptions-item>
              <el-descriptions-item label="生日">5月29日</el-descriptions-item>
              <el-descriptions-item label="身高">158cm</el-descriptions-item>
              <el-descriptions-item label="职业">虚拟YouTuber</el-descriptions-item>
              <el-descriptions-item label="出道时间">2020年4月12日</el-descriptions-item>
              <el-descriptions-item label="语言">日语、中文</el-descriptions-item>
              <el-descriptions-item label="代表色">白色、粉色</el-descriptions-item>
              <el-descriptions-item label="粉丝名">帕清姬</el-descriptions-item>
            </el-descriptions>
          </el-card>
          
          <el-card class="info-card" style="margin-top: 20px">
            <h3>个人简介</h3>
            <p>
              眞白花音是一名来自日本的个人势虚拟YouTuber，于2020年4月12日正式出道。
              她拥有非常流利的中文能力，能够用中文进行直播和与观众交流，这也是她在中国拥有大量粉丝的重要原因之一。
            </p>
            <p>
              她的直播内容非常丰富，包括各种游戏直播、杂谈、唱歌、画画等。
              她性格开朗活泼，说话风趣幽默，直播氛围轻松愉快，深受观众的喜爱。
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.avatar-card {
  text-align: center;
  padding: 30px;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
}

.avatar-card h2 {
  margin-bottom: 10px;
  color: #333;
}

.avatar-card p {
  color: #666;
  margin-bottom: 5px;
}

.info-card {
  padding: 20px;
}

.info-card h3 {
  margin-bottom: 15px;
  color: #333;
}

.info-card p {
  line-height: 1.8;
  color: #666;
}
</style>