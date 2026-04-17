# 眞白花音粉丝站

## 版本说明
**当前版本：v0.1.1**
为眞白花音（帕清姬）打造的轻量化、高颜值个人粉丝站点，持续迭代优化中。

### v0.1.1 更新日志
- 导航栏优化：移除自动折叠，新增「音视频下载」「小游戏」「动态提醒」栏目，「关于本站」直接平铺
- 手机端交互：汉堡菜单改为导航栏下方下拉式，抽屉宽度适配
- 轮播体验：手机端隐藏箭头，纯手指左右滑动切换上一张/下一张
- 按钮布局：手机端「查看更多资料」「B站主页」「进入直播间」三按钮同一行紧凑显示

### v0.1.0 更新日志
- 清理冗余内容：移除作品页多余标注、视频跳转按钮，精简页面结构
- 完善作品展示：调整代表作品页歌曲排序，优化封面图片展示，修复加载问题
- 修正文本细节：统一页面文案，修正歌曲名等内容，优化可读性
- 为后续内容做好准备

---

## 在线访问
- 正式生产环境：https://mashirokanon-website.netlify.app
- 代码仓库：GitHub

---

## 技术栈
- 前端框架：Vue 3 + `<script setup>`
- 构建工具：Vite
- 部署平台：Netlify（国内直连、永久免费）
- 版本管理：Git

---

## 本地开发
```bash
# 克隆项目
git clone https://github.com/Lihua21-work/mashirokanon-website.git

# 进入项目目录
cd mashirokanon-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

---

## Git 提交流程
```bash
# 检查状态
git status

# 添加修改
git add .

# 提交（示例）
git commit -m "chore: bump version to v0.1.1"

# 推送到 GitHub
git push origin main
```
