import pkg from '../../package.json'

export const SITE_VERSION = pkg.version

export const siteUpdates = [
  {
    date: '2026-08-01',
    title: 'v0.1.4 动态提醒与 Serverless 升级',
    content: '重构「动态提醒」页面：新增直播间实时开播状态监控看板；接入 Serverless API 与 Wbi 加密签名技术实现 B 站动态全自动实时获取；彻底清理写死假数据并优化为单次+手动刷新机制；展示精简限制为最新的 5 条动态。',
    tag: 'v0.1.4',
    tagType: 'danger',
    type: 'danger'
  },
  {
    date: '2026-07-26',
    title: 'v0.1.3 全站视觉焕新与功能升级',
    content: '全站引入现代化 CSS 变量与设计规范，新增「小游戏」与「动态提醒」页面，重构全站组件并优化移动端响应式体验。',
    tag: 'v0.1.3',
    tagType: 'primary',
    type: 'primary'
  },
  {
    date: '2026-04-17',
    title: 'v0.1.2 移动端交互修复',
    content: '解决移动端轮播图左右滑动体验，优化顶部导航适配与图片资源依赖路径。',
    tag: 'v0.1.2',
    tagType: 'success',
    type: 'success'
  },
  {
    date: '2026-04-17',
    title: 'v0.1.1 导航与布局优化',
    content: '优化导航栏呈现效果，新增「小游戏」「动态提醒」栏目，提升多端联动交互。',
    tag: 'v0.1.1',
    tagType: 'warning',
    type: 'warning'
  },
  {
    date: '2026-04-15',
    title: 'v0.1.0 内容完善与修正',
    content: '清理冗余内容与视频跳转，调整代表作品排序及图片展示，修正页面细节文案。',
    tag: 'v0.1.0',
    tagType: 'primary',
    type: 'primary'
  },
  {
    date: '2026-04-15',
    title: '眞白花音粉丝纪念网站上线',
    content: '提供个人资料、作品列表、游玩的工程游戏以及经典名场面语录收集。',
    tag: '站点上线',
    tagType: 'info',
    type: 'info'
  }
]
