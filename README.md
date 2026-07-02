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

## 5. 项目运行

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

## 6. 项目结构

```
campus-market-seed/
├── db.json                  # Mock 数据
├── src/
│   ├── api/                 # API 封装（6 个模块）
│   ├── components/          # 通用组件（9 个）
│   ├── router/              # 路由配置（10 条）
│   ├── stores/              # Pinia 状态管理
│   ├── views/               # 页面视图（10 个）
│   ├── App.vue
│   └── main.ts
├── docs/
│   ├── ai/                  # AI 协作记录
│   └── evidence/            # 每日证据卡
├── scripts/                 # 检测脚本
└── CHECK_REPORT.md          # 最终检测报告
```

## 7. 检测命令

```bash
# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 构建验证
pnpm build

# 自动检测（Day3 校验）
pnpm check -- --day=3
```
