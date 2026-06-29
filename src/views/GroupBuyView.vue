<template>
  <section class="page">
    <div class="page-header">
      <h1>拼单搭子</h1>
      <p>找拼单伙伴，一起享受更优惠的价格。</p>
    </div>

    <EmptyState v-if="!groupBuys.length" text="暂无拼单信息" />

    <div v-else class="list">
      <ItemCard
        v-for="item in groupBuys"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type"
        :location="item.location"
        :time="item.deadline"
      >
        <template #footer>
          <span class="count">{{ item.currentCount }}/{{ item.targetCount }} 人</span>
          <span class="publisher">{{ item.publisher }}</span>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'

const groupBuys = ref<GroupBuyItem[]>([])

onMounted(async () => {
  const res = await getGroupBuys()
  groupBuys.value = res.data
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.count {
  font-weight: 600;
  color: #2563eb;
}

.publisher {
  margin-left: 12px;
  color: #6b7280;
}
</style>
