# Day7 证据卡 — 综合验收与项目展示

## 1. 最终功能清单

校园轻集市经过 7 天开发，共实现以下功能：

### 页面（10 个）

| 路由 | 页面 | 核心能力 |
|------|------|---------|
| `/` | 首页 | 项目入口，导航到各业务板块 |
| `/trade` | 二手交易 | 列表渲染、关键词搜索、收藏交互、loading/error/empty 三态 |
| `/lost-found` | 失物招领 | 列表渲染 |
| `/group-buy` | 拼单搭子 | 列表渲染 |
| `/errand` | 跑腿委托 | 列表渲染 |
| `/publish` | 信息发布 | 四类表单切换、字段校验、POST 提交、未登录守卫 |
| `/message` | 消息中心 | 静态消息展示 |
| `/user` | 个人中心 | 用户信息、收藏管理、我的发布、未登录提示 |
| `/login` | 登录 | 用户名+密码校验、错误提示 |
| `/register` | 注册 | 五字段表单、用户名查重、POST 创建用户 |

### 通用组件（9 个）

| 组件 | 用途 |
|------|------|
| AppLayout.vue | 页面整体布局框架 |
| AppHeader.vue | 顶部导航栏，登录态条件渲染 |
| AppNav.vue | 导航菜单 |
| ItemCard.vue | 信息卡片，slot 自定义尾部 |
| EmptyState.vue | 空状态占位提示 |
| FormField.vue | 表单字段包装（标签、必填、错误） |
| LoadingState.vue | 加载中状态（CSS Spinner） |
| ErrorState.vue | 加载失败提示（可重试） |
| SearchBar.vue | 搜索输入框（v-model + 清空） |

### API 模块（6 个）

- `http.ts` — Axios 实例（baseURL: localhost:3001）
- `user.ts` — getUsers / createUser
- `trade.ts` — getTrades / createTrade
- `lostFound.ts` — getLostFounds / createLostFound
- `groupBuy.ts` — getGroupBuys / createGroupBuy
- `errand.ts` — getErrands / createErrand

### Pinia Store（2 个）

- **userStore**: `login()`, `logout()`, `restoreLogin()`, `isLoggedIn`, `currentUser`, `displayName`, `userDescription`
- **favoriteStore**: `addFavorite()`, `removeFavorite()`, `toggleFavorite()`, `isFavorite()`, `favorites`

### Mock 数据（db.json，5 个集合）

| 集合 | 条数 | 说明 |
|------|------|------|
| users | 1 | 默认测试用户 |
| trades | 6 | 二手交易 |
| lostFounds | 5 | 失物招领 |
| groupBuys | 5 | 拼单搭子 |
| errands | 5 | 跑腿委托 |

---

## 2. 构建与检测结果

### 代码质量

| 命令 | 结果 | 说明 |
|------|------|------|
| `pnpm lint` | ✅ 0 warnings, 0 errors | oxlint + eslint 双重检查 |
| `pnpm type-check` | ✅ 通过 | vue-tsc 类型检查 |
| `pnpm build` | ✅ 构建成功 | 143 modules, 166KB JS + 9KB CSS |

### 自动检测（Day3 脚本）

```
结果: 20/20 全部通过!
```

### 最终检测报告

`CHECK_REPORT.md` 覆盖 12 个检查维度，全部通过。

---

## 3. 证据卡完整性检查

| 证据卡 | 关键词要求 | 状态 |
|--------|-----------|------|
| Day1_Evidence.md | 页面清单、业务梳理 | ✅ |
| Day2_Evidence.md | 页面骨架、路由导航、公共布局 | ✅ |
| Day3_Evidence.md | Mock 数据、JSON Server、列表渲染 | ✅ |
| Day4_Evidence.md | 发布表单、表单校验、数据新增 | ✅ |
| Day5_Evidence.md | Pinia、状态管理、用户中心 | ✅ |
| Day6_Evidence.md | 交互优化、加载状态、错误状态 | ✅ |
| Day7_Evidence.md | 综合验收、项目展示、AI 复盘 | ✅ |

所有 7 张证据卡均包含：
- 真实开发记录（完成的功能、技术要点） ✅
- 问题记录（遇到的问题、原因、解决方法） ✅
- AI 协作记录（AI 做了什么、人工调整了什么） ✅
- 个人反思（对技术或流程的理解） ✅

---

## 4. Git 提交检查

```
8408fde Day7: finalize AI Collaboration Card
2241f0a Day7: fix evidence keywords and restructure README
fdff029 Day7: update README with project features and structure
8082cc3 Day7: add final CHECK_REPORT.md
a87ebed Day7: final walkthrough and validation
ae3f4b9 Day6: add mock auth and improve user experience
39ca69f Day6: add user auth (login/register), state persistence, search, and status components
ddfe309 Day5: add Pinia stores and user center
c8d86b2 Day4: update evidence card
48ed13f Day4: add publish form and POST request
38643be Day3: add mock data and list rendering
742b337 Day2: complete page skeleton and router navigation
e7582bf docs: complete Day1 evidence
74d8e09 docs: establish course documentation system
```

- 总计 14 次提交
- 每天至少 1 次有效提交 ✅
- 提交信息清晰反映当天工作 ✅
- Day7 提交 5 次（走查、检测报告、README、证据卡、AI 协作卡） ✅

---

## 5. 项目展示准备

### 项目简介
"校园轻集市"是一个面向高校校园生活场景的 PC 端 Web App，支持二手交易、失物招领、拼单搭子、跑腿委托等功能。用户可浏览信息、发布内容、收藏商品，并通过注册登录管理个人数据。

### 技术栈
Vue 3 + Vite + TypeScript + Vue Router + Pinia + Axios + JSON Server

### 运行方式
```bash
pnpm install    # 安装依赖
pnpm mock       # 启动 Mock 服务（端口 3001）
pnpm dev        # 启动前端项目（端口 5173）
pnpm build      # 构建项目
```

### 项目结构
```
campus-market-seed/
├── db.json                  # Mock 数据（users + 4 类业务数据）
├── src/
│   ├── api/                 # 接口请求模块（6 个）
│   ├── components/          # 公共组件（9 个）
│   ├── router/              # 路由配置（10 条）
│   ├── stores/              # Pinia 状态管理（user + favorite）
│   ├── views/               # 页面组件（10 个）
│   ├── App.vue
│   └── main.ts
├── docs/
│   ├── ai/                  # AI 协作记录
│   └── evidence/            # 每日证据卡（Day1-Day7）
├── CHECK_REPORT.md          # 最终检测报告
├── package.json
└── README.md
```

---

## 6. AI 协作复盘

### 各阶段 AI 与人工分工

| Day | AI 辅助内容 | 人工调整内容 | 协作模式 |
|-----|------------|-------------|---------|
| Day1 | 项目结构分析、技术栈梳理 | 修正需求范围、调整后续计划 | AI 分析 → 人工确认范围 |
| Day2 | 页面骨架模板、路由配置 | 调整布局风格、删减多余路由 | AI 生成框架 → 人工定制 |
| Day3 | Mock 数据、API 类型定义 | 补充业务字段、调整组件粒度 | AI 填充数据 → 人工调字段 |
| Day4 | 表单组件、校验逻辑 | 删除图片上传、简化校验规则 | AI 生成复杂版 → 人工做减法 |
| Day5 | Pinia Store、收藏逻辑 | 修正类型定义、补充空状态 | AI 写逻辑 → 人工修安全 |
| Day6 | 注册/登录、状态组件 | 修复 null 安全、补充查重逻辑 | AI 生成模板 → 人工补边界 |
| Day7 | 走查脚本、检测报告框架 | 填充真实数据、验证结果真实性 | AI 出骨架 → 人工填血肉 |

### AI 的长处与短板

**AI 擅长的领域：**
- 模板代码生成（表单、列表、样式）——节省约 60% 的编写时间
- 重复性代码生成（API 模块、路由配置、组件注册）
- 文档框架和结构梳理
- 边界情况提醒（AI 在生成代码时自动包含空状态、加载状态的处理）

**AI 的短板：**
- 类型安全 — 频繁生成 `null` 安全问题（`currentUser` 可能为 `null`）
- 业务理解 — 不知道「校园集市」需要什么字段，生成过于通用的数据
- 范围控制 — 倾向于引入超出项目范围的功能（JWT、图片上传、权限路由）
- 代码稳定性 — 不关心新代码是否破坏了已有功能

### 核心经验
1. AI 生成代码后，必须先通过 `pnpm type-check` 和 `pnpm lint` 做基础过滤
2. 不能信任 AI 的 import 路径，需要逐行检查
3. AI 给出复杂方案时，反问自己：「这个复杂度对当前项目是必要的吗？」——大部分情况不需要
4. 证据卡和反思必须自己写，AI 无法替代真实的学习记录

---

## 7. 个人总结与改进方向

### 收获

通过 7 天的校园轻集市项目开发，我在以下方面有了实质性提升：

**Vue 3 工程化能力**：从零搭建了一个完整的 Vue 3 前端项目，经历了「页面骨架 → Mock 数据 → API 封装 → 列表渲染 → 表单提交 → 状态管理 → 用户认证 → 交互优化」的完整开发周期。之前零散学习的 Composition API、Pinia、Vue Router 在实战中被串联起来，形成了系统性的理解。

**状态管理的认知升级**：Day5 和 Day6 的 Pinia 实践让我理解了为什么需要全局状态管理——当同一个用户的登录状态需要在导航栏、发布页、个人中心三个位置读取和修改时，Pinia 的「状态提升」优势非常明显。如果没有 Pinia，要么用 props 层层传递（路径太长），要么用事件总线（难以追踪），都不是好方案。

**AI 协作的理性认识**：实训之前我对 AI Coding 的认知是「AI 能写代码，我只需要提需求」。实训之后认识到，AI 是「效率放大器」而不是「替代者」——在模板代码上放大效率，在业务逻辑上不能替代判断。最浪费时间的情况是 AI 生成了复杂但错误的代码，人工需要花比重写更多的时间去调试和修复。

### 改进方向

如果继续完善项目，我会从以下方向入手：

1. **类型安全强化**：项目中还有一些 `as` 类型断言和非空断言（`item.id!`），说明类型设计还有改进空间。可以引入更精确的类型定义来消除这些断言。

2. **组件复用性**：目前四个业务列表页（TradeView、LostFoundView、GroupBuyView、ErrandView）的代码结构高度相似，可以抽象为一个通用的列表页面组件，通过 props 区分不同的 API 端点和字段映射。

3. **测试覆盖**：项目目前没有单元测试和组件测试。如果项目规模扩大，应该至少为 Pinia Store 和 API 模块添加单元测试。

4. **跨标签页状态同步**：当前 localStorage 不会在多个标签页之间同步状态（一个标签页退出登录后，其他标签页不会感知）。可以监听 `storage` 事件来实现跨标签页状态同步。

5. **构建优化**：当前构建产物 166KB JS + 9KB CSS，对于本项目已经很小。但如果添加更多功能，应该考虑路由懒加载和代码分割。

### 写在最后

校园轻集市是一个教学实训项目，代码中保留了刻意简化的设计（Mock 认证、明文密码、无图片上传），这些简化不是「没做完」，而是为了让课程聚焦于前端核心技能的学习。如果这个项目要用于真实校园场景，需要在认证安全、数据持久化、部署运维等方面做大量增强。但作为 7 天的 Vue 3 入门到实践项目，它完成了自己的使命——让我在写代码的过程中真正理解了 Vue 3 生态。
