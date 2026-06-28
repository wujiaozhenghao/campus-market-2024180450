<template>
  <nav class="app-nav">
    <router-link to="/">首页</router-link>
    <router-link to="/trade">二手交易</router-link>
    <router-link to="/lost-found">失物招领</router-link>
    <router-link to="/group-buy">拼单搭子</router-link>
    <router-link to="/errand">跑腿委托</router-link>
    <router-link to="/publish">发布信息</router-link>
    <router-link to="/message">消息中心</router-link>
    <router-link to="/user">个人中心</router-link>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  gap: 16px;
}

.app-nav a {
  font-size: 14px;
  color: #6b7280;
  transition: color 0.2s;
}

.app-nav a:hover,
.app-nav a.router-link-active {
  color: #1a73e8;
}
</style>
