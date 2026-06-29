import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const day = process.argv.find(a => a.startsWith('--day=') && a !== '--')
if (!day) {
  console.error('用法: node scripts/check.js --day=<数字>')
  process.exit(1)
}

const dayNum = day.split('=')[1]

function check(desc, ok) {
  console.log(`  ${ok ? '✓' : '✗'} ${desc}`)
  return ok
}

function hasFile(path) {
  return existsSync(resolve(root, path))
}

function readJSON(path) {
  try {
    return JSON.parse(readFileSync(resolve(root, path), 'utf-8'))
  } catch {
    return null
  }
}

console.log(`\nDay${dayNum} 检测报告\n`)

if (dayNum === '3') {
  let passed = 0
  const total = 20

  console.log('1. 数据建模')
  passed += check('存在 db.json', hasFile('db.json'))
  const db = readJSON('db.json')
  const hasTrades = db && Array.isArray(db.trades) && db.trades.length >= 5
  const hasLostFounds = db && Array.isArray(db.lostFounds) && db.lostFounds.length >= 5
  const hasGroupBuys = db && Array.isArray(db.groupBuys) && db.groupBuys.length >= 5
  const hasErrands = db && Array.isArray(db.errands) && db.errands.length >= 5
  passed += check('db.json 包含 trades (≥5条)', hasTrades)
  passed += check('db.json 包含 lostFounds (≥5条)', hasLostFounds)
  passed += check('db.json 包含 groupBuys (≥5条)', hasGroupBuys)
  passed += check('db.json 包含 errands (≥5条)', hasErrands)

  console.log('\n2. 接口封装')
  passed += check('存在 src/api/http.ts', hasFile('src/api/http.ts'))
  passed += check('存在 src/api/trade.ts', hasFile('src/api/trade.ts'))
  passed += check('存在 src/api/lostFound.ts', hasFile('src/api/lostFound.ts'))
  passed += check('存在 src/api/groupBuy.ts', hasFile('src/api/groupBuy.ts'))
  passed += check('存在 src/api/errand.ts', hasFile('src/api/errand.ts'))

  console.log('\n3. 页面渲染')
  const views = ['TradeView.vue', 'LostFoundView.vue', 'GroupBuyView.vue', 'ErrandView.vue']
  for (const v of views) {
    const path = `src/views/${v}`
    const content = hasFile(path) ? readFileSync(resolve(root, path), 'utf-8') : ''
    const hasDataFetch = content.includes('onMounted') || content.includes('getTrades') || content.includes('getLostFounds') || content.includes('getGroupBuys') || content.includes('getErrands')
    passed += check(`src/views/${v} 包含数据请求`, hasDataFetch)
  }

  console.log('\n4. 组件')
  passed += check('存在 src/components/ItemCard.vue', hasFile('src/components/ItemCard.vue'))
  passed += check('存在 src/components/EmptyState.vue', hasFile('src/components/EmptyState.vue'))

  console.log(`\n5. 证据卡`)
  const evidenceExists = hasFile('docs/evidence/Day3_Evidence.md')
  passed += check('存在 docs/evidence/Day3_Evidence.md', evidenceExists)
  if (evidenceExists) {
    const content = readFileSync(resolve(root, 'docs/evidence/Day3_Evidence.md'), 'utf-8')
    passed += check('包含「我的设计」内容', content.includes('我的设计'))
    passed += check('包含「AI 设计」内容', content.includes('AI 设计'))
    passed += check('包含「最终调整」内容', content.includes('最终调整'))
  }

  console.log(`\n结果: ${passed}/${total}`)
  if (passed === total) {
    console.log('全部通过!')
  } else {
    console.log(`还有 ${total - passed} 项未通过。`)
  }
} else {
  console.log(`Day${dayNum} 检测尚未实现。`)
}
