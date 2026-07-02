# Day6 证据卡 — 用户认证与搜索/状态功能

## 一、注册登录设计

### 注册流程
校园轻集市的注册功能在 `RegisterView.vue` 中实现，操作流程如下：

1. 用户填写用户名、密码、姓名、学院、年级五个必填字段
2. 前端通过 `validateForm()` 进行字段级校验——用户名不能为空、密码不能少于 6 位、姓名/学院/年级不能为空，校验不通过时在对应字段下方显示红色错误文案
3. 校验通过后，调用 `getUsers()` 获取所有用户数据，用 `Array.some()` 检查用户名是否已存在；若重复则在用户名字段显示「用户名已存在」
4. 用户名不重复时，调用 `createUser()` 向 `POST /users` 发送请求，将新用户写入 `db.json`
5. 注册成功后弹出「注册成功，请登录」提示，跳转到 `/login` 页面

### 登录流程
登录功能在 `LoginView.vue` 和 `userStore.login()` 中协作完成：

1. 用户输入用户名和密码，前端 `validateForm()` 校验必填
2. 校验通过后，调用 `userStore.login(username, password)`
3. `login()` 内部调用 `getUsers()` 获取全部用户，用 `Array.find()` 匹配 `username` 和 `password` 都一致的用户
4. 匹配成功：将用户对象写入 Pinia 的 `currentUser` 状态，`isLoggedIn` 置为 `true`，同时 `JSON.stringify` 后写入 `localStorage`
5. 匹配失败：抛出错误「账号或密码错误」，页面显示红色错误提示
6. 登录成功后弹出提示并跳转到 `/user` 个人中心

### 数据库层面
`db.json` 中的 `users` 数组作为唯一用户数据源，以明文存储用户名和密码。这是 Mock 项目的刻意简化，真实的用户系统应使用哈希加密存储密码。

### 用户数据结构说明

| 字段 | 含义 | 示例 |
|------|------|------|
| username | 用户名 | student |
| password | 密码 | 123456 |
| name | 显示名称 | 校园用户 |
| college | 学院 | 计算机学院 |
| grade | 年级 | 2023级 |
| avatar | 头像 | 暂为空 |
| bio | 个人简介 | 热爱校园生活，喜欢分享闲置好物。 |

## 二、状态持久化设计

### 为什么使用 localStorage
Vue 的 Pinia 状态默认只存在于内存中，一旦用户刷新页面，所有状态都会丢失。对于校园轻集市这类项目，用户最直观的体验要求是：**刷新页面后仍保持登录状态**。

选择 `localStorage` 的原因如下：

- **简单直接**：Vue 生态中状态持久化最常用的方案是 localStorage，不需要引入额外依赖（如 vuex-persistedstate、pinia-plugin-persistedstate），适合教学项目
- **有效期可控**：localStorage 的数据不会自动过期，适合本项目的「一次登录持续使用」场景（无需强制重新登录）
- **跨标签页一致**：同一浏览器中所有标签页共享 localStorage，用户不会因为打开新标签页而需要重新登录（本项目不涉及跨标签状态同步，但不冲突）
- **代码可读性强**：`localStorage.setItem/getItem/removeItem` 是浏览器原生 API，实训学生不需要理解插件机制就能看懂

### 持久化实现细节
- 登录成功时：`localStorage.setItem('campus-market-current-user', JSON.stringify(user))`
- 页面加载时（`App.vue` 的 `onMounted`）：调用 `userStore.restoreLogin()`，从 localStorage 读取并解析用户对象，写入 Pinia
- 退出登录时：`localStorage.removeItem('campus-market-current-user')`
- 异常保护：`restoreLogin()` 中的 `JSON.parse` 包裹在 `try/catch` 中，如果 localStorage 数据损坏则清除并静默恢复为未登录状态

### 安全说明
需要明确指出：**本项目不是生产级安全认证系统**。

原因如下：
- 密码以明文存储在 `db.json` 中，无哈希加密（如 bcrypt）
- 无 Token/JWT 机制，登录校验仅为 JSON Server 的 GET 请求
- 无 HTTPS 传输加密（开发环境使用 HTTP）
- 无 Session/Cookie 机制，仅依靠 localStorage 中的明文用户对象标识身份
- 无权限路由守卫——用户虽然可以访问 `/login` 和 `/register`，但未登录用户同样可以手动在地址栏输入 `/trade` 等路由访问公开页面（只有发布和个人中心做了防御性校验）

这些简化对于教学实训项目是合理的，允许学生聚焦于 Vue 组件交互和状态管理，而不是花时间搭建后端认证基础设施。

## 三、交互优化

### 搜索功能
`SearchBar.vue` 组件使用 `v-model` 双向绑定（`modelValue` / `update:modelValue`），提供关键词输入和清空按钮。在 `TradeView.vue` 中，通过 `computed` 属性 `filteredTrades` 实时过滤，匹配字段包括：标题、分类、地点、描述。搜索是客户端过滤，不发起新的网络请求，响应速度快。

### 加载状态
`LoadingState.vue` 使用纯 CSS 旋转动画（`@keyframes spin`），28px 蓝色圆形 Spinner，下方显示自定义文本（默认「正在加载数据...」）。`TradeView.vue` 中，`loadTrades()` 开始时设置 `loading = true`，完成后置为 `false`。

### 错误状态与重试
`ErrorState.vue` 以红色边框卡片形式展示错误消息，通过 `showRetry` 属性控制是否显示「重新加载」按钮。点击后触发 `retry` 事件，父组件重新调用 `loadTrades()`。当 JSON Server 未启动或网络故障时，用户可以获得明确的错误状态提示并一键重试。

### 空状态
`EmptyState.vue` 在「无搜索结果」或「收藏列表为空」「发布记录为空」时展示，提示文案可通过 `text` prop 自定义。

### 收藏按钮视觉反馈
`TradeView.vue` 中的收藏按钮在已收藏状态添加 `.active` 类：背景从灰色（`#f3f4f6`）切换为蓝色（`#dbeafe`），文字从深灰（`#374151`）切换为主题蓝色（`#2563eb`），用户无需阅读文字就能通过颜色变化感知收藏状态。

### 发布体验改进
- 未登录时提交发布：弹出「请先登录后再发布信息」提示，自动跳转到 `/login`
- 提交中：按钮文字变为「提交中...」并禁用（`:disabled="submitting"`）
- 提交失败：提示文案明确指向「JSON Server 是否已启动」和「表单数据是否完整」
- 发布成功后自动跳转到对应列表页

## 四、页面联动

登录状态在整个应用中实现了一致联动：

| 页面/组件 | 登录前表现 | 登录后表现 |
|-----------|-----------|-----------|
| AppHeader 导航栏 | 显示「登录」「注册」链接 | 显示当前用户名（点击进入 `/user`）和「退出」按钮 |
| 发布页 PublishView | 点击发布时 alert 并跳转登录 | 正常填写并发布，publisher 自动填入用户名 |
| 个人中心 UserCenterView | 显示「请先登录」提示 + 去登录链接 | 显示头像（用户名首字）、学院年级、Bio、收藏列表、发布列表 |
| 二手交易 TradeView | 可正常浏览（公开页面） | 可正常浏览，不受登录状态影响 |
| 登录页 LoginView | 正常访问 | — |
| 注册页 RegisterView | 正常访问 | — |

核心设计原则：**不限制浏览，只限制操作**。用户不需要登录就能浏览所有列表页面，只有在「发布信息」和「查看个人中心」时需要登录。这种设计符合校园集市的使用场景——学生随手浏览无需注册，只有需要发布或管理信息时才需要登录。

## 五、AI 协作记录

### AI 帮助生成的代码
- `LoginView.vue` 和 `RegisterView.vue` 的完整模板（表单结构、样式布局）
- `userStore` 的 `login`/`logout`/`restoreLogin` 方法骨架
- `LoadingState.vue`、`ErrorState.vue`、`SearchBar.vue` 三个组件
- `TradeView.vue` 的搜索过滤逻辑和 loading/error/empty 状态模板
- `App.vue` 的 `onMounted` + `restoreLogin` 调用
- `AppHeader.vue` 的登录/未登录条件渲染

### 人工调整的内容
- **UserCenterView 类型错误**：AI 生成的 `userStore.currentUser.bio` 在 TypeScript 中报错（`currentUser` 可能为 `null`），改为 `userStore.currentUser?.bio`（可选链操作符）
- **未使用 import 清理**：AI 生成了 `src/stores/user.ts` 时保留了原有的 `CurrentUser` 接口和 `updateProfile` 方法，手动删除了这些不再使用的代码
- **错误提示文案**：AI 最初使用「发布失败，请检查 Mock 服务是否正常运行」，手动改为更明确地提示「JSON Server 是否已启动，并检查表单数据是否完整」
- **收藏按钮样式**：AI 仅生成了基础 `favorite-btn` 样式，手动补充了 `.active` 类切换逻辑和蓝色主题色样式
- **注册检查用户名重复**：AI 只是简单调用了 `createUser`，手动补充了 `getUsers` → `some()` 查重逻辑，防止重复注册

### 审查结论
AI 生成的代码在结构和样式方面节省了大量时间，但以下方面需要人工把关：
1. TypeScript 类型安全（null 值处理）
2. 业务逻辑完整性（未实现的功能边界）
3. 样式一致性（与项目中已有的设计风格对齐）
4. 已有代码不被破坏（兼容 Day1-Day5 的代码）

## 六、完整功能走查记录

执行时间：2026-07-02

| # | 操作 | 预期结果 | 实际结果 |
|---|------|---------|---------|
| 1 | 启动 JSON Server（`pnpm mock`） | 端口 3001 启动成功 | ✅ |
| 2 | 启动开发服务器（`pnpm dev`） | 端口 5173 启动成功 | ✅ |
| 3 | 访问首页 `/` | 页面正常渲染 | ✅ |
| 4 | 点击导航栏「注册」链接 | 跳转到 `/register` | ✅ |
| 5 | 填写表单并注册新用户 `testuser` | 提示「注册成功，请登录」并跳转到 `/login` | ✅ |
| 6 | 查看 `db.json` 的 `users` 数组 | `testuser` 出现在数组中（id: 2） | ✅ |
| 7 | 用 `testuser` + `pass123` 登录 | 提示「登录成功」并跳转到 `/user` | ✅ |
| 8 | 导航栏显示 | 显示「测试用户」链接和「退出」按钮 | ✅ |
| 9 | 刷新页面（F5） | 导航栏仍显示「测试用户」，登录状态保持 | ✅ |
| 10 | 进入发布页 `/publish`，选择「二手交易」并填写信息 | 发布成功，跳转到 `/trade` | ✅ |
| 11 | 确认该条信息的 publisher 字段 | 显示为「测试用户」 | ✅ |
| 12 | 进入二手交易页，在搜索框输入关键词 | 列表实时过滤，匹配标题/分类/地点/描述 | ✅ |
| 13 | 点击某条商品的「收藏」按钮 | 按钮变为「已收藏」，颜色变为蓝色 | ✅ |
| 14 | 进入个人中心「我的收藏」 | 该商品出现在收藏列表中 | ✅ |
| 15 | 点击「退出」按钮 | 导航栏切换为「登录」「注册」，跳转到 `/login` | ✅ |
| 16 | 直接访问 `/user` | 显示「请先登录」提示和「去登录」链接 | ✅ |
| 17 | 直接访问 `/publish`，填写并发布 | 弹出「请先登录后再发布信息」并跳转登录 | ✅ |
| 18 | 停止 JSON Server，刷新 `/trade` | 显示 ErrorState 红色错误卡片 | ✅ |
| 19 | 点击「重新加载」按钮 | 仍失败（JSON Server 未启动），error 状态保持 | ✅ |
| 20 | 重新启动 JSON Server，点击「重新加载」 | 数据恢复，正常显示列表 | ✅ |
| 21 | 执行 `pnpm lint` | 0 warnings, 0 errors | ✅ |
| 22 | 执行 `pnpm type-check` | 通过 | ✅ |
| 23 | 执行 `pnpm build` | 构建成功（166KB JS, 9KB CSS） | ✅ |

## 七、遇到的问题与解决方法

### 问题 1：UserCenterView TypeScript 编译报错
**现象**：`pnpm type-check` 报错 `error TS18047: '__VLS_ctx.userStore.currentUser' is possibly 'null'`，指向 `UserCenterView.vue` 第 11 行的 `{{ userStore.currentUser.bio }}`。
**原因**：Day6 将 `userStore.currentUser` 的类型从 `CurrentUser`（非空对象）改为 `User | null`，但模板中没有处理 null 情况。
**解决**：将 `currentUser.bio` 改为 `currentUser?.bio`，使用可选链操作符安全访问。同时将所有硬编码的用户数据引用改为可空安全写法。

### 问题 2：AI 生成了未使用的接口和方法的遗留代码
**现象**：`pnpm build` 通过，但 `src/stores/user.ts` 中残留了 `CurrentUser` 接口定义和 `updateProfile` 方法，而在 Day5 之后的代码中已不再使用。
**原因**：AI 在生成新的 `userStore` 代码时保留了 Day5 的旧代码片段，没有主动清理。
**解决**：人工审查后删除了 `CurrentUser` 接口和 `updateProfile` 方法，仅保留 `isLoggedIn`、`currentUser`、`displayName`、`userDescription`、`login`、`logout`、`restoreLogin`。

### 问题 3：注册成功但 JSON Server 崩溃
**现象**：使用 curl 测试注册时，POST 请求返回成功，但 JSON Server 随后停止响应。
**原因**：JSON Server 在 Windows 环境下使用 `nohup` 后台运行时，当 `db.json` 文件被写入时可能因文件锁冲突退出。
**解决**：重启 JSON Server 后重新测试，注册数据已正确写入。后续测试改用直接启动 JSON Server（不放入后台）避免了该问题。

## 八、代码检查结果

| 检查项 | 结果 |
|--------|------|
| `pnpm lint` | 0 warnings, 0 errors |
| `pnpm type-check` | 通过 |
| `pnpm build` | 构建成功 |
| 无 JWT/Token/权限路由代码 | ✅ |
| 无未使用 import/变量 | ✅ |
| 无虚构功能描述 | ✅ |

## 九、新增/修改文件清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| src/App.vue | 修改 | 加入 restoreLogin |
| src/components/AppHeader.vue | 修改 | 登录态条件渲染 |
| src/components/LoadingState.vue | 新建 | CSS Spinner 加载组件 |
| src/components/ErrorState.vue | 新建 | 错误卡片 + 重试按钮 |
| src/components/SearchBar.vue | 新建 | v-model 搜索框 + 清空 |
| src/views/LoginView.vue | 新建 | 用户名+密码登录 |
| src/views/RegisterView.vue | 新建 | 五字段注册 + 查重 |
| src/views/TradeView.vue | 修改 | 搜索/loding/error/empty/收藏 active |
| src/views/PublishView.vue | 修改 | 未登录守卫 + 错误提示优化 |
| src/views/UserCenterView.vue | 修改 | 未登录提示 |
| src/stores/user.ts | 修改 | 改造为 API 登录 + localStorage 持久化 |
| src/router/index.ts | 修改 | 增加 /login 和 /register 路由 |
| src/api/user.ts | 新建 | getUsers / createUser |
| db.json | 修改 | 增加 users 数据集合 |

## 十、本日小结

Day6 完成了校园轻集市的用户认证体系搭建和交互体验优化。注册和登录功能基于 JSON Server 的 RESTful API 实现，状态持久化选择 localStorage 方案以保持教学项目的简洁性。同时为二手交易页面添加了搜索、加载、错误和空状态四态切换，配合 SearchBar、LoadingState、ErrorState、EmptyState 四个可复用组件，提升了用户体验。发布页面和个人中心增加了未登录守卫，实现了登录状态在整个应用中的联动。所有代码变更均通过 lint、类型检查和构建验证，没有破坏 Day1-Day5 的已有功能。

## 十一、今日反思

通过完成 Day6 的注册/登录功能，我对前端 Mock 认证有了更清晰的认识：

**关于用户状态**：登录状态不是简单的「是否登录」布尔值，而是需要在整个应用多个组件间同步的全局状态。使用 Pinia 管理用户状态比 props 逐层传递或事件总线更合适，因为用户信息需要在导航栏、发布页、个人中心等多个异构页面中读取和修改。State + Getters + Actions 的结构天然适合这种场景。

**关于状态持久化**：Vue 应用的状态分为「视图状态」（如弹窗开关、当前选中 tab）和「用户身份状态」（如谁登录了）。前者丢失影响不大，后者丢失会导致用户需要重新登录，体验极差。localStorage + restoreLogin 的组合是前端持久化的最小可行方案——它不需要后端参与，实现简单，但对理解「状态的生命周期」很有帮助。如果未来项目规模扩大，可以考虑换用 pinia-plugin-persistedstate 自动管理持久化键的序列化和反序列化。

**关于 Mock 认证边界**：本项目的「认证」严格来说只是「前端本地比对」，并非真正的认证系统。生产环境中用户密码会用 bcrypt 哈希加密，服务端会签发 JWT Token，前后端每次通信都会验证 Token 有效性并检查过期时间。但在教学项目中，把认证简化为「发 GET 请求 → 数组 find → 存 localStorage」有助于学生先理解状态管理的核心逻辑，而不被加密算法和 HTTP Header 签名等复杂性分散注意力。这个边界划定是合理的——项目名称本身就包含「轻」字，轻量、可信、面向校园生活。
