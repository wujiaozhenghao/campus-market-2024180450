<template>
  <AppLayout />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import AppLayout from './components/AppLayout.vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.restoreLogin()
})
</script>
