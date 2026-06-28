# Day2 Evidence - 页面骨架与路由导航

## 1. 今日完成内容

完成了校园轻集市项目的页面骨架搭建、路由配置和公共布局组件开发。具体包括：创建了 8 个核心业务页面（首页、二手交易、失物招领、拼单搭子、跑腿委托、发布信息、消息中心、个人中心），配置了 Vue Router 路由（含 meta.title 和语义化路径），并抽取了 3 个公共布局组件（AppLayout、AppHeader、AppNav），将导航栏从 App.vue 分离到独立组件中，使项目结构更清晰、更易于后续扩展。

## 2. 页面与路由清单

| 页面名称 | 路由路径 | 文件位置 |
|---|---|---|
| 首页 | / | src/views/HomeView.vue |
| 二手交易 | /trade | src/views/TradeView.vue |
| 失物招领 | /lost-found | src/views/LostFoundView.vue |
| 拼单搭子 | /group-buy | src/views/GroupBuyView.vue |
| 跑腿委托 | /errand | src/views/ErrandView.vue |
| 发布信息 | /publish | src/views/PublishView.vue |
| 消息中心 | /message | src/views/MessageView.vue |
| 个人中心 | /user | src/views/UserCenterView.vue |

项目可正常构建（53 modules transformed，构建耗时 202ms）。

## 3. AI 协作记录

**使用工具**：Opencode（本对话中的 AI Coding 工具）

**核心提示词**：要求分析现有项目结构、理解技术栈（Vue3 + Vite + TypeScript + Vue Router + Pinia），然后依次完成页面创建、路由配置、布局组件抽取。

**AI 生成内容**：
- 页面清单和路由的推荐方案（含 meta.title、语义化路径、统一命名规范）
- 三个布局组件的示例代码：AppNav.vue（含 router-link-active 高亮样式）、AppHeader.vue（品牌区 + 标语 + 导航）、AppLayout.vue（页面骨架 + 居中内容区）
- `main.ts` 中引入全局 `main.css` 的写法

**人工审查与修改**：
- 路由路径：AI 最初使用 `/lostfound` 和 `/groupbuy`，我改为 `/lost-found` 和 `/group-buy`（连词符分隔，更可读）
- 页面名称：AI 生成了 `ProfileView` 和 `UserCenterView` 两个重复页面，我删除了 `ProfileView`，保留 `UserCenterView` 并改名为"个人中心"
- 冗余页面：删除了无业务归属的 `ListView.vue`、`DetailView.vue`、`BoardView.vue`
- 导入路径：将 `@/components/AppLayout.vue` 改为 `./components/AppLayout.vue`（相对路径风格统一）
- 页面骨架：为旧页面（PublishView、MessageView）补齐了 `<script setup lang="ts">` 和 `<style scoped>`，确保所有页面结构一致

## 4. 遇到的问题与解决方法

**问题 1：路由路径变更后导航链接未同步**

AI 生成了新的路由配置后，发现 `App.vue` 中的 `<router-link to="...">` 仍然指向旧的路径（如 `/lostfound` 而不是 `/lost-found`），导致点击导航会跳转到不存在的路由。

解决方法：手动同步修改 `App.vue` 中的 8 个 `<router-link>` 的 `to` 属性和显示文字，确保与路由配置完全一致。后来进一步将导航抽取到 `AppNav.vue` 组件中，以后只需修改一处。

**问题 2：页面重复导致的混淆**

项目初期 AI 建议同时保留 `ProfileView.vue`（个人中心）和 `UserCenterView.vue`（用户中心），两者功能高度重叠。同时还有 `ListView.vue`、`DetailView.vue`、`BoardView.vue` 等无具体业务归属的页面。

解决方法：人工判断后删除了 4 个冗余文件，最终保留 8 个页面，每个页面都对应一个明确的校园集市场景。

**问题 3：AI 生成的代码风格不一致**

较早创建的 6 个页面（如 PublishView、MessageView）只有 `<template>` 标签，缺少 `<script setup>` 和 `<style scoped>`，而较晚创建的 5 个页面（如 TradeView、LostFoundView）则包含完整三段式结构。

解决方法：逐一补齐了所有页面的骨架，统一使用 `<main class="page">` + `.page { padding: 24px }` 的结构，保持代码风格一致性。

## 5. 今日反思

**页面骨架**是项目的"地基"，今天搭建的 8 个页面覆盖了校园集市的核心业务场景（交易、失物、拼单、跑腿、发布、消息、个人中心），后续只需往每个页面填充具体业务逻辑即可。如果没有提前规划好页面，开发过程中容易出现"页面不够用"或"页面重复"的问题。

**路由导航**是用户访问页面的入口。今天路由配置时特意注意了三点：一是路径使用语义化的连词符（如 `/lost-found`）而不是无意义的片段；二是每条路由都加了 `meta.title`，后续页面标题切换和导航高亮可以基于此扩展；三是统一使用 camelCase 命名（`name: 'lostFound'`），保持可读性。

**公共布局组件**的抽取是今天最值得的投入。一开始导航写在 `App.vue` 里，后来发现每加一个页面都要改 `App.vue`，所以果断把导航拆到 `AppNav.vue`，头部拆到 `AppHeader.vue`，再通过 `AppLayout.vue` 组合。这样一来，`App.vue` 从 24 行减到了 7 行，整个布局结构一目了然。后续如果要统一加页脚、加面包屑、改导航样式，都只需要改对应的布局组件，不用动页面本身。

关于 AI 协作的体会：AI 可以快速生成大量代码，但直接接受所有输出会引入重复、冗余和不一致。今天的经验是——让 AI 生成初稿，然后人工做"减法"：删掉多余的页面，统一命名风格，补齐缺失的骨架。这个过程比从零写代码快，但比纯复制粘贴更有掌控感。
