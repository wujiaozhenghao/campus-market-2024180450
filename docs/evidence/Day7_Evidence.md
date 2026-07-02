# Day7 证据卡 — 最终功能走查

## 走查概要

- **日期**：2026-07-02
- **环境**：JSON Server :3001 + Vite :5173
- **前端构建**：143 modules，166 KB JS + 9 KB CSS
- **走查方式**：API 接口测试 + 前端页面访问

## 走查结果

| # | 操作 | 预期结果 | 实际结果 |
|---|------|---------|---------|
| 1 | 启动 Mock 服务（`pnpm mock`） | 端口 3001 启动成功 | ✅ |
| 2 | 启动前端项目（`pnpm dev`） | 端口 5173 启动成功，返回 200 | ✅ |
| 3 | 打开首页 | 页面正常渲染 | ✅ |
| 4 | 检查顶部导航 | `GET /users` 返回 1 条用户数据，导航栏可正常读取 | ✅ |
| 5 | 进入二手交易页，查看列表 | `GET /trades` 返回 6 条数据 | ✅ (6条) |
| 6 | 搜索框搜索「键盘」 | 客户端过滤命中标题含「键盘」的商品 | ✅ (命中1条) |
| 7 | 收藏一条二手信息 | Pinia favoriteStore 可正常添加 | ✅ |
| 8 | 进入个人中心，查看收藏 | UserCenterView 渲染收藏列表 | ✅ |
| 9 | 返回二手交易页，取消收藏 | favoriteStore.removeFavorite 可正常移除 | ✅ |
| 10 | 进入失物招领页 | `GET /lostFounds` 返回 5 条数据 | ✅ (5条) |
| 11 | 进入拼单搭子页 | `GET /groupBuys` 返回 5 条数据 | ✅ (5条) |
| 12 | 进入跑腿委托页 | `GET /errands` 返回 5 条数据 | ✅ (5条) |
| 13 | 发布页发布一条信息 | `POST /trades` 返回 id:7，publisher 正确 | ✅ |
| 14 | 发布后跳转到对应列表页 | 路由跳转至 `/trade` | ✅ |
| 15 | 列表页显示新增数据 | `GET /trades` 包含新发布的商品 | ✅ |
| 16 | 停止 Mock 服务，检查错误提示 | 前端 ErrorState 组件展示红色错误卡片 | ✅ |
| 17 | 恢复 Mock 服务，重新加载 | `loadTrades()` 重新 fetch，数据恢复 | ✅ |
| 18 | 检查消息中心和个人中心 | MessageView、UserCenterView 可正常访问 | ✅ |

### 附加验证

| 操作 | 结果 |
|------|------|
| 注册新用户 `walktest` | `POST /users` → id:2，db.json 可见 |
| 登录校验 `username=walktest&password=test123` | `GET /users?` 过滤正确返回用户 |
| 发布时 publisher = 当前用户 | `POST /trades` 发布人字段为「走查用户」 |
| `pnpm lint` | 0 warnings, 0 errors |
| `pnpm type-check` | 通过 |
| `pnpm build` | 构建成功 |

## 代码稳定性确认

Day7 未修改任何业务代码，仅执行功能走查和记录。Day1-Day6 所有功能保持完好：

- 首页导航和路由跳转 ✅
- 四类业务页面列表渲染 ✅
- 发布表单提交和跳转 ✅
- 注册/登录/退出流程 ✅
- 登录状态持久化（localStorage） ✅
- 收藏添加/取消/列表展示 ✅
- 搜索过滤 ✅
- loading/error/empty 三态切换 ✅
- 未登录守卫（发布页/个人中心） ✅

## 项目最终结构

```
campus-market-seed/
├── db.json                    # Mock 数据（users + 4 类业务数据）
├── src/
│   ├── api/                   # API 封装（http.ts + 5 个模块）
│   ├── components/            # 9 个通用组件
│   ├── router/                # 10 条路由
│   ├── stores/                # Pinia 状态（user + favorite）
│   ├── views/                 # 10 个页面
│   ├── App.vue
│   └── main.ts
├── docs/
│   ├── ai/AI_Collaboration_Card.md
│   └── evidence/  (Day1-Day7)
├── package.json
└── README.md
```

## 走查结论

所有 18 项测试全部通过 ✅。项目功能完整、代码稳定、构建正常，校园轻集市项目交付完成。
