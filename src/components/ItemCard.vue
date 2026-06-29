<template>
  <article class="item-card">
    <div class="item-card__header">
      <h3>{{ title }}</h3>
      <span v-if="tag" class="tag">{{ tag }}</span>
    </div>

    <p class="description">{{ description }}</p>

    <div class="meta">
      <span v-if="location">地点：{{ location }}</span>
      <span v-if="time">时间：{{ time }}</span>
    </div>

    <div v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tag?: string
  location?: string
  time?: string
}>()
</script>

<style scoped>
.item-card {
  padding: 18px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.item-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.item-card h3 {
  margin: 0;
  font-size: 18px;
}

.tag {
  padding: 4px 8px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 12px;
}

.description {
  margin: 12px 0;
  color: #4b5563;
  line-height: 1.6;
}

.meta {
  display: flex;
  gap: 16px;
  color: #6b7280;
  font-size: 13px;
}

.footer {
  margin-top: 12px;
}
</style>
