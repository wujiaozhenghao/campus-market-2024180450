# Day 1 过程证据

## 今日完成内容

1. **开发环境搭建**
   - Node.js 版本确认（通过 .nvmrc 锁定）
   - pnpm 安装依赖并成功启动项目（`pnpm dev` → localhost:5173）
   - 项目能够正常运行，首页显示"项目启动成功"

2. **项目结构分析**
   - 浏览了完整的目录结构，理解 `src/` 下各目录的职责：
     - `api/` — 后端 API 调用层（待填充）
     - `components/` — 公共 UI 组件（待填充）
     - `router/` — Vue Router 路由配置
     - `stores/` — Pinia 状态管理（待填充）
     - `views/` — 页面级组件
   - 阅读并理解了 `main.ts` 的启动流程（createApp → use(Pinia) → use(Router) → mount）
   - 阅读并理解了 `router/index.ts` 的路由配置方式

3. **技术栈梳理**
   - Vue 3 + TypeScript + Vite + Pinia + Vue Router
   - 工具链：ESLint + OxLint 双重 lint，vue-tsc 类型检查

4. **项目规划文档**
   - 编写了 `docs/guide/Project_Plan.md`，包含：
     - 9 个页面及路由设计
     - 5 大功能模块划分
     - 7 天甘特图开发顺序
     - 6 项开发重点

## 学习收获

- **Vue 3 项目的标准启动模板结构**：之前单独学过 Vue 3 语法，但第一次看到完整工程的结构 —— `api/`、`stores/`、`router/`、`views/`、`components/` 的分层设计让我理解了"关注点分离"在实战中是如何落地的。
- **Vite 作为构建工具的优势**：`pnpm dev` 启动速度非常快，HMR 几乎是秒级响应，比之前用的 webpack 体验好很多。
- **TypeScript 在项目中的角色**：多个 `tsconfig*.json` 文件分别配置了应用代码和 Node 脚本的编译规则，`env.d.ts` 提供了环境类型声明，让我认识到 TS 不是"可选的"，而是项目的基础设施。
- **AI 协作的边界**：在写项目规划时，我提出需求 → AI 生成框架 → 我根据自己的理解调整模块划分和开发顺序，这种"AI 辅助但不替代"的模式让效率明显提升。

## 遇到的问题

1. **pnpm 安装依赖时 node-gyp 报错**
   - 原因：本地未安装 C++ 编译工具链
   - 解决：执行 `pnpm config set node-gyp rebuild false` 跳过可选依赖的编译，项目正常运行
   - 反思：有些依赖的 postinstall 脚本在 Windows 上可能需要额外工具，遇到时先判断是否为必需依赖

2. **对 Vue Router v5 的 API 不熟悉**
   - 之前用的是 Vue Router v4，v5 的 `createRouter` / `createWebHistory` 签名有细微变化
   - 解决：查阅官方文档确认 `import.meta.env.BASE_URL` 的用法
   - 反思：框架升级后应先看 Changelog 再着手开发

3. **项目内没有《需求分析》文档原文**
   - 推测需求分析是教师在《项目指导书》中单独发布的
   - 解决：从项目名"校园轻集市"和 7 天 Evidence 模板推断出功能范围（商品浏览、购物车、订单、用户认证、发布商品）
   - 反思：后续应主动向教师确认需求文档的准确来源

## AI 协作情况

| 阶段 | Prompt | AI 输出 | 我的处理 |
|------|--------|---------|---------|
| 结构分析 | "分析项目目录结构" | 完整的目录树及每层说明 | 直接采纳，在自己的理解中补充了"骨架阶段"的观察 |
| main.ts 解释 | "解释 main.ts" | 逐行注释 + 执行顺序总结 | 采纳，并补充了自己对插件机制的理解 |
| Router 理解 | "解释 router 的作用" | 路由映射 + History 模式 + RouterView 说明 | 采纳，思考了后续如何添加新路由 |
| 技术栈分析 | "分析当前项目采用的技术栈" | 表格形式列出技术及版本 | 采纳，补充了"SPA 架构模式"的总结 |
| 项目规划 | "阅读需求分析后，完成项目规划" | 生成 Mermaid 图 + 表格 + 甘特图 | 调整了模块划分（合并登录注册为 Auth 模块），增加了"开发重点"部分 |

## 后续计划

- Day 2：实现用户认证模块（登录 / 注册页面 + Auth Store + Token 管理）
- 学习 Vue Router 的导航守卫用法，为后续权限控制做准备
- 了解 Axios 的封装模式，为 API 层编写做准备
