# 校园轻集市 — 高保真原型

## 设计规范

| 项目 | 值 |
|------|-----|
| 主色 | `#2D8CF0`（清爽校园蓝） |
| 成功色 | `#00B578` |
| 警告色 | `#FF9A2E` |
| 危险色 | `#F53F3F` |
| 背景色 | `#F5F7FA` |
| 卡片背景 | `#FFFFFF` |
| 卡片圆角 | `12px` |
| 卡片阴影 | `0 2px 12px rgba(0,0,0,0.06)` |
| 字体 | `-apple-system, "PingFang SC", "Microsoft YaHei"` |
| 内容宽度 | `max-width: 1280px` |
| 顶部导航高度 | `64px` |

## 图片来源

所有图片均来自 Unsplash：
- 教材/书籍：`https://images.unsplash.com/photo-1495446815901-a7297e633e8d`
- 奶茶/餐饮：`https://images.unsplash.com/photo-1558857563-b371033873b8`
- 快递：`https://images.unsplash.com/photo-1603400521630-9f2de124b33b`
- 失物：`https://images.unsplash.com/photo-1586282391129-76a6df230234`
- 耳机：`https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46`
- 显示器：`https://images.unsplash.com/photo-1527443224154-c4a3942d3acf`
- 头像：Unsplash 人物头像（Face crop）
- 其他：校园场景、食物、交通工具等

## 迁移到 Vue3 + Vite + TypeScript + Element Plus 建议

1. **目录结构**：每个 HTML 文件对应 `src/views/` 下的一个 `.vue` 文件
2. **公共组件**：
   - 顶部导航 → `src/components/AppHeader.vue`
   - 分类导航 → `src/components/CategoryNav.vue`
   - 信息卡片 → `src/components/ItemCard.vue`
   - 详情右侧栏 → `src/components/DetailSidebar.vue`
3. **路由**：参考 `src/router/index.ts` 配置
4. **状态管理**：用户信息/消息未读等全局状态使用 Pinia
5. **API 层**：`src/api/` 下按模块拆分（goods、lost、group、task、user、message）
6. **样式**：`src/assets/main.css` 中保留了通用样式，可直接沿用

## 页面清单

| # | 文件 | 说明 |
|---|------|------|
| 1 | index.html | 原型入口页 |
| 2 | home.html | 首页 / 信息流 |
| 3 | category.html | 分类浏览 |
| 4 | item-detail.html | 二手商品详情 |
| 5 | lost-detail.html | 失物招领详情 |
| 6 | group-detail.html | 拼单搭子详情 |
| 7 | task-detail.html | 跑腿委托详情 |
| 8 | publish.html | 信息发布选择 |
| 9 | publish-item.html | 发布二手商品 |
| 10 | publish-lost.html | 发布失物招领 |
| 11 | publish-group.html | 发布拼单搭子 |
| 12 | publish-task.html | 发布跑腿委托 |
| 13 | messages.html | 消息列表 |
| 14 | chat.html | 聊天详情 |
| 15 | profile.html | 个人中心 |
| 16 | my-posts.html | 我的发布 |
| 17 | favorites.html | 我的收藏 |
| 18 | settings.html | 账号设置 |
| 19 | login.html | 登录 |
| 20 | register.html | 注册 |
| 21 | admin-dashboard.html | 管理端首页 |
| 22 | admin-review.html | 信息审核 |
