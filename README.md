# 校园轻集市

## 1. 项目简介

"校园轻集市"是一个面向高校校园生活场景的 PC 端 Web App，主要支持二手交易、失物招领、拼单搭子、跑腿委托等功能。用户可浏览信息、发布内容、收藏商品，并通过注册登录管理个人数据。

## 2. 技术栈

- Vue 3
- Vite
- TypeScript
- Vue Router
- Pinia
- Axios
- JSON Server

## 3. 核心功能

- 首页与导航
- 二手交易列表（搜索 / 加载 / 错误 / 空状态）
- 失物招领列表
- 拼单搭子列表
- 跑腿委托列表
- 信息发布（登录守卫 + 表单校验）
- 用户注册与登录（localStorage 持久化）
- 个人中心（收藏 + 我的发布）
- 收藏功能（添加 / 取消 / 视觉反馈）
- 消息中心

## 4. 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 入口页 |
| `/trade` | 二手交易 | 支持搜索过滤 |
| `/lost-found` | 失物招领 | 列表浏览 |
| `/group-buy` | 拼单搭子 | 列表浏览 |
| `/errand` | 跑腿委托 | 列表浏览 |
| `/publish` | 发布信息 | 4 种发布类型 |
| `/message` | 消息中心 | 静态消息展示 |
| `/user` | 个人中心 | 收藏 + 我的发布 |
| `/login` | 登录 | 用户名+密码 |
| `/register` | 注册 | 5 字段表单 |

## 5. 项目目录说明

| 目录 / 文件 | 说明 |
|-------------|------|
| `src/api` | 接口请求模块（http.ts + 5 个业务模块） |
| `src/components` | 公共组件（9 个：布局/导航/卡片/表单/状态等） |
| `src/router` | 路由配置（10 条） |
| `src/stores` | Pinia 状态管理（user + favorite） |
| `src/views` | 页面组件（10 个） |
| `docs/evidence` | 每日证据卡（Day1-Day7） |
| `docs/ai` | AI 协作记录 |
| `db.json` | Mock 数据（users + 4 类业务数据） |

## 6. 项目运行

```bash
# 安装依赖
pnpm install

# 启动 Mock 服务（端口 3001）
pnpm mock

# 启动前端项目（端口 5173）
pnpm dev

# 构建项目
pnpm build
```

## 7. 每日开发记录

| Day | 主题 | 核心交付 |
|-----|------|---------|
| Day1 | 项目启动与业务梳理 | 环境搭建、项目结构分析、技术栈梳理 |
| Day2 | 页面骨架与路由导航 | 10 条路由配置、AppLayout/AppHeader/AppNav |
| Day3 | Mock 数据建模与列表渲染 | db.json 四类业务数据、API 封装、列表渲染 |
| Day4 | 发布表单与数据新增 | PublishView 四类表单、POST 请求、表单校验 |
| Day5 | 状态管理与用户中心 | Pinia userStore/favoriteStore、UserCenterView |
| Day6 | 交互优化与体验完善 | 注册登录、localStorage 持久化、搜索/状态组件 |
| Day7 | 综合验收与项目展示 | 18 步走查、CHECK_REPORT.md、README 完善 |

## 8. AI 协作说明

本项目在开发过程中使用 AI Coding 工具辅助完成页面骨架、Mock 数据、接口封装、表单设计、状态管理和交互优化。开发者对 AI 生成内容进行了人工审查、修改和取舍，具体过程记录在 `docs/evidence/` 和 `docs/ai/` 中。
