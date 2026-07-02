<template>
  <header class="app-header">
    <div class="brand">
      <span class="logo">校园轻集市</span>
      <span class="slogan">轻量、可信、面向校园生活</span>
    </div>

    <AppNav />

    <div class="user-actions">
      <template v-if="userStore.isLoggedIn">
        <RouterLink to="/user">{{ userStore.displayName }}</RouterLink>
        <button type="button" @click="handleLogout">退出</button>
      </template>

      <template v-else>
        <RouterLink to="/login">登录</RouterLink>
        <RouterLink to="/register">注册</RouterLink>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import AppNav from './AppNav.vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.slogan {
  font-size: 13px;
  color: #6b7280;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.user-actions a {
  color: #2563eb;
  text-decoration: none;
}

.user-actions button {
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
}
</style>
