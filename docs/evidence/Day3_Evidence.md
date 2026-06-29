# Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

- 创建了 `db.json`，包含二手交易(trades)、失物招领(lostFounds)、拼单搭子(groupBuys)、跑腿委托(errands)四类 Mock 数据，每类 5~6 条，贴近校园生活场景
- 使用 JSON Server 作为 Mock API，在 `package.json` 中添加 `mock` 脚本，端口 3001
- 使用 Axios 封装基础请求实例 (`src/api/http.ts`)，baseURL 指向 JSON Server
- 为每类业务创建独立 API 模块 (`trade.ts` / `lostFound.ts` / `groupBuy.ts` / `errand.ts`)
- 创建通用列表卡片组件 `ItemCard.vue` 和空状态组件 `EmptyState.vue`
- 在四个核心页面中请求数据并渲染列表

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、price、category、location、condition、publishTime、status | 展示二手商品列表 |
| lostFounds | 失物招领 | title、type、itemName、location、eventTime、contact、status | 展示失物和招领信息 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline、location、status | 展示拼单信息 |
| errands | 跑腿委托 | title、taskType、reward、from、to、deadline、status | 展示跑腿任务列表 |

## 3. 我的设计

- **二手交易 (trades)**：设计 `price` 和 `condition` 字段，因为二手交易的核心是价格和物品成色，用户需要根据价格筛选商品、根据成色判断是否值得购买。`category` 字段便于按类别分类浏览。
- **失物招领 (lostFounds)**：设计 `type` 字段区分"丢失"和"拾到"，避免两类信息混杂。`itemName` 单独提取方便快速识别物品类型，`contact` 用于联系认领。
- **拼单搭子 (groupBuys)**：设计 `targetCount` 和 `currentCount` 记录目标人数和当前已有人数，用户需要知道拼单进度。`deadline` 表示截止时间，避免过期拼单。
- **跑腿委托 (errands)**：设计 `from` 和 `to` 标明取送地点，`reward` 表示酬劳（金额较小，贴近校园场景），`taskType` 分类（取快递、代买、占座等）。

## 4. AI 设计

AI 工具完成了以下内容的生成：
- 生成了 `db.json` 的四类业务数据结构和示例数据，字段命名清晰合理
- 生成了 `src/api/http.ts` 的 Axios 基础封装
- 生成了四个业务 API 模块 (`trade.ts` / `lostFound.ts` / `groupBuy.ts` / `errand.ts`)，包含类型接口和请求函数
- 生成了 `ItemCard.vue` 通用卡片组件和 `EmptyState.vue` 空状态组件
- 生成了四个页面的列表渲染代码
- 补充了每类数据至至少 5 条

AI 生成内容的优点：数据结构规范、代码风格统一、组件化设计合理。没有明显不合理之处。

## 5. 最终调整

- 将 `trades` 数据从 2 条补充到 6 条，确保更多展示内容
- 在页面中增加了 `EmptyState` 空状态处理，列表为空时显示友好提示
- 将字段值调整为更贴近中文校园场景的显示方式（如 `type: 'lost'` 在页面显示为"丢失"）
- 为跑腿委托的 `location` 字段拼接为 `from → to` 的格式展示
- 使用 pnpm 替代 npm 作为包管理器（项目已有配置）

## 6. 遇到的问题与解决方法

**问题**：端口 3001 已被占用，JSON Server 启动失败，提示 `EADDRINUSE`。

**解决方法**：通过 `curl` 确认已有服务在运行后，发现实质是前一次运行的后台进程未释放。最终手动在终端单独启动 `pnpm mock` 解决。后续可通过 `npx kill-port 3001` 或在任务管理器中结束 Node 进程来释放端口。

## 7. 今日反思

Mock 数据是前端开发的基础。有了 Mock 数据和接口封装，前后端就能同时开发，不用等后端。把接口放到单独的 API 文件里，页面代码就不用管请求的事，以后换真实接口只用改个地址就行。用 ItemCard 组件让代码更好复用，不用每个页面都写一遍卡片样式。
