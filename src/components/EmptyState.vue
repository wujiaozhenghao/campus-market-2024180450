<template>
  <div class="empty-state">
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style scoped>
.empty-state {
  padding: 32px;
  text-align: center;
  color: #6b7280;
  background: #fff;
  border-radius: 12px;
  border: 1px dashed #d1d5db;
}
</style>
