<template>
  <section class="page">
    <div v-if="!userStore.isLoggedIn" class="panel">
      <h1>请先登录</h1>
      <p>登录后可以查看个人资料、我的收藏和我的发布。</p>
      <RouterLink class="login-link" to="/login">去登录</RouterLink>
    </div>

    <template v-else>
      <div class="profile-card">
        <div class="avatar">
          {{ userStore.displayName.slice(0, 1) }}
        </div>

        <div>
          <h1>{{ userStore.displayName }}</h1>
          <p>{{ userStore.userDescription }}</p>
          <p>{{ userStore.currentUser?.bio }}</p>
        </div>
      </div>

      <div class="panel">
        <h2>我的收藏 ({{ favoriteStore.favorites.length }})</h2>

        <EmptyState
          v-if="favoriteStore.favorites.length === 0"
          text="暂无收藏内容"
        />

        <div v-else class="post-list">
          <ItemCard
            v-for="item in favoriteStore.favorites"
            :key="`fav-${item.type}-${item.id}`"
            :title="item.title"
            :description="item.description"
            :tag="getTypeLabel(item.type)"
            :location="item.location"
          >
            <template #footer>
              <button class="action-btn" @click="favoriteStore.removeFavorite(item.type, item.id)">
                取消收藏
              </button>
            </template>
          </ItemCard>
        </div>
      </div>

      <div class="panel">
        <h2>我的发布 ({{ myPosts.length }})</h2>

        <EmptyState
          v-if="myPosts.length === 0"
          text="暂无发布记录"
        />

        <div v-else class="post-list">
          <ItemCard
            v-for="(item, idx) in myPosts"
            :key="`pub-${item.type}-${item.id}-${idx}`"
            :title="item.title"
            :description="item.description"
            :tag="getTypeLabel(item.type)"
            :location="item.location"
            :time="item.time"
          />
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import ItemCard from '../components/ItemCard.vue'
import { useFavoriteStore } from '../stores/favorite'
import { useUserStore } from '../stores/user'
import { getTrades, type TradeItem } from '../api/trade'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'
import { getErrands, type ErrandItem } from '../api/errand'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const trades = ref<TradeItem[]>([])
const lostFounds = ref<LostFoundItem[]>([])
const groupBuys = ref<GroupBuyItem[]>([])
const errands = ref<ErrandItem[]>([])

onMounted(async () => {
  const [tRes, lfRes, gbRes, eRes] = await Promise.all([
    getTrades(),
    getLostFounds(),
    getGroupBuys(),
    getErrands(),
  ])
  trades.value = tRes.data
  lostFounds.value = lfRes.data
  groupBuys.value = gbRes.data
  errands.value = eRes.data
})

const myPosts = computed(() => {
  const name = userStore.displayName
  const result: Array<{ type: string; id: number; title: string; description: string; location: string; time: string }> = []

  for (const item of trades.value) {
    if (item.publisher === name) {
      result.push({ type: 'trade', id: item.id!, title: item.title, description: item.description, location: item.location, time: item.publishTime })
    }
  }

  // lostFound 暂不包含 publisher 字段，不参与筛选

  for (const item of groupBuys.value) {
    if (item.publisher === name) {
      result.push({ type: 'groupBuy', id: item.id!, title: item.title, description: item.description, location: item.location, time: item.deadline })
    }
  }

  for (const item of errands.value) {
    if (item.publisher === name) {
      result.push({ type: 'errand', id: item.id!, title: item.title, description: item.description, location: `${item.from} → ${item.to}`, time: item.deadline })
    }
  }

  return result
})

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    trade: '二手交易',
    lostFound: '失物招领',
    groupBuy: '拼单搭子',
    errand: '跑腿委托',
  }
  return map[type] || '校园信息'
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card,
.panel {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eff6ff;
  color: #2563eb;
  font-size: 28px;
  font-weight: 700;
}

.profile-card h1,
.panel h2 {
  margin: 0 0 8px;
}

.profile-card p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.post-list {
  display: grid;
  gap: 16px;
}

.action-btn {
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
}

.login-link {
  display: inline-block;
  margin-top: 12px;
  border-radius: 8px;
  padding: 10px 18px;
  background: #2563eb;
  color: #fff;
  text-decoration: none;
}
</style>
