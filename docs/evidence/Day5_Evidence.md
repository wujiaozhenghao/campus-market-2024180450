# Day5 Evidence - 状态管理与用户中心

## 1. 今日完成内容

今天完成了 **Pinia** 状态管理相关的工作，包括创建 `userStore` 和 `favoriteStore` 两个 Store，并在多个页面中引入使用。在 `AppHeader.vue` 中显示当前用户名称；在 `PublishView.vue` 中将发布人从硬编码 `'当前用户'` 改为从 `userStore.displayName` 读取；在 `TradeView.vue` 中添加了收藏按钮；在 `UserCenterView.vue` 中实现了用户资料显示、我的收藏列表和我的发布（按 publisher 筛选）三个模块。通过这次实践，掌握了 **状态管理** 在多组件间共享数据的实际应用，并完成了 **用户中心** 页面的完整开发。

## 2. Store 设计说明

| Store 文件 | 管理内容 | 主要状态 | 主要方法 |
|---|---|---|---|
| src/stores/user.ts | 当前用户信息 | isLoggedIn、currentUser（name/college/grade/avatar/bio） | updateProfile、login、logout |
| src/stores/favorite.ts | 收藏状态 | favorites（FavoriteItem 数组） | addFavorite、removeFavorite、toggleFavorite、isFavorite |

userStore 使用了模拟用户数据，不依赖真实后端登录接口。favoriteStore 的收藏保存在内存中，刷新页面后丢失，后续可结合 localStorage 持久化。

## 3. 状态边界说明

**放入 Store 的数据：**
- **当前用户信息**：因为导航栏（AppHeader）、发布页（PublishView）和个人中心（UserCenterView）三处都需要读取用户名称和资料。如果不放入 Store，每个页面都要重新请求或各自维护一份，数据容易不一致。
- **收藏列表**：因为列表页（TradeView）和个人中心（UserCenterView）都需要读取和修改收藏数据。收藏状态需要在不同页面间实时同步。

**没有放入 Store 的数据：**
- **表单校验错误**：错误信息只在发布页面内使用，发布完成后就清空，没有跨页面共享需求，放在组件内的 reactive 对象即可。
- **表单临时输入内容**：标题、价格、描述等输入值只在当前表单有效，切换发布类型或重置表单后会被清空，不需要全局共享。
- **从 API 获取的列表数据**：trades、lostFounds、groupBuys、errands 的列表数据只在各自的业务页面中使用，没有跨页面共享的必要，用组件内的 ref 管理更简洁。

## 4. 页面使用记录

| 页面/组件 | 使用的 Store | 用途 |
|---|---|---|
| AppHeader.vue | userStore | 头部导航栏右侧显示当前用户名称（displayName） |
| PublishView.vue | userStore | 提交数据时将 publisher 字段设为 userStore.displayName |
| TradeView.vue | favoriteStore | 每个商品卡片底部显示收藏按钮，点击切换收藏状态 |
| UserCenterView.vue | userStore + favoriteStore | 显示用户头像名称简介、收藏列表（含取消收藏）、我的发布（按 publisher 过滤四类数据） |

## 5. AI 协作记录

使用的 AI 工具为 Claude（opencode 内置模型），在 VS Code 终端中以对话方式完成。

核心提示词方向：要求 AI 在已有 Vue3 + Vite + TypeScript + Pinia + Axios + JSON Server 项目中创建用户状态 Store 和收藏 Store，并在导航栏、发布页、列表页和个人中心中使用。

AI 生成的内容包括：
- `src/stores/user.ts` 完整的 defineStore 定义（state / getters / actions）
- `src/stores/favorite.ts` 收藏 Store（isFavorite / addFavorite / removeFavorite / toggleFavorite）
- `AppHeader.vue` 引入 userStore 并显示 displayName
- `PublishView.vue` 引入 userStore，publisher 改为动态读取
- `TradeView.vue` 引入 favoriteStore，添加收藏按钮
- `UserCenterView.vue` 完整的个人中心页面代码

AI 生成内容中发现的不合理之处：
- AI 假设所有数据类型都有 `publisher` 字段，但 `lostFoundItem` 接口中没有 publisher。在 myPosts 筛选时需要对 lostFound 做特殊处理（跳过）。
- `TradeItem.id` 在接口中为 `number | undefined`（可选），直接传给 `toggleFavorite(id)` 会报类型错误，需要加 `item.id!` 非空断言。
- AI 生成的收藏按钮没有区分"收藏"和"已收藏"的视觉差异，手动调整了按钮文字逻辑。

## 6. 人工调整内容

- 将 lostFound 从"我的发布"筛选中排除（因为接口和 db.json 都没有 publisher 字段，无法按用户筛选）
- 在 `TradeView.vue` 中为 `item.id` 添加 `!` 非空断言修复 TypeScript 类型错误
- 在 `UserCenterView.vue` 中为"我的发布"区域增加了统计数据展示 `({{ myPosts.length }})`
- 统一了所有页面的卡片和面板样式（圆角、白色背景、灰色辅助色）
- 为 `UserCenterView.vue` 添加了 `onMounted` 中四类数据的并行请求 `Promise.all`

## 7. 测试记录

在浏览器中进行以下操作验证功能：

1. 打开首页 http://localhost:5173，导航栏右侧显示"校园用户"，来自 `userStore.displayName`
2. 进入二手交易页面 `/trade`，每个商品卡片底部有"收藏"按钮
3. 点击某一商品的"收藏"按钮，按钮文字变为"已收藏"
4. 连续点击同一商品的收藏按钮，按钮在"收藏"和"已收藏"之间切换（toggle）
5. 进入个人中心 `/user`，"我的收藏"区域显示刚刚收藏的商品（已添加的 1 条数据）
6. 点击收藏卡片上的"取消收藏"按钮，该商品从收藏列表中移除
7. 发布一条新商品后，进入个人中心，在"我的发布"中可以看到该商品的记录

前后端交互验证：通过 curl 发送 POST 请求创建商品，publisher 字段为"校园用户"，然后刷新个人中心页面，新发布的商品出现在"我的发布"列表中。确认 publisher 字段已正确从 userStore 读取，而不是硬编码。

## 8. 遇到的问题与解决方法

**问题 1：Store 导入路径错误。** 在 AppHeader.vue 中使用 `import { useUserStore } from '../stores/user'` 时，由于文件结构不熟悉，一开始写成了 `./stores/user`。Vite 热更新会报模块未找到错误。解决方法：确认当前文件在 `src/components/` 目录下，Store 在 `src/stores/` 目录下，相对路径应为 `../stores/user`。

**问题 2：TypeScript 类型错误。** `TradeItem.id` 定义为 `id?: number`（可选），但 `toggleFavorite` 和 `isFavorite` 要求 `id: number`（必填）。将模板中的 `item.id` 改为 `item.id!` 使用非空断言解决，因为 JSON Server 返回的数据必定包含 id 字段。

**问题 3：lostFound 没有 publisher 字段。** 在实现"我的发布"时，需要从四类数据中筛选出当前用户发布的内容。但 `LostFoundItem` 接口和 `db.json` 中的 lostFounds 数据都没有 `publisher` 字段。解决方法：在 `myPosts` 的 computed 中跳过 lostFound 类型的筛选，只在 trade、groupBuy、errand 三类中按 publisher 过滤。

**问题 4：收藏刷新后丢失。** favoriteStore 的数据保存在内存中（Pinia 的 state），刷新浏览器后数据回到初始空数组。这是 Day5 可接受的行为，后续可以通过 `pinia-plugin-persistedstate` 或手动 `localStorage` 结合实现持久化。

## 9. 今日反思

**Pinia** 状态管理解决的核心问题是"多个组件如何共享同一份数据"。在 Day4 之前，所有数据要么来自 API 请求（如商品列表），要么是组件内部状态（如表单输入），不存在跨页面共享的需求。Day5 引入 Store 后，用户信息在导航栏、发布页和个人中心三处保持同步；收藏状态在列表页和个人中心之间实时联动。如果没有 Pinia，这些数据只能在每个页面单独请求或通过 props 逐级传递，代码会变得非常臃肿。**状态管理** 让应用的数据流向清晰可控，知道数据在哪定义、在哪修改、在哪展示。**用户中心** 页面是 Store 使用的集中体现——它同时读取 userStore（用户资料）和 favoriteStore（收藏列表），并在此基础上增加了 API 数据的二次筛选（我的发布），展示了多种数据源在同一个页面中的协同工作方式。
