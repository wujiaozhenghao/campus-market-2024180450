<template>
  <section class="page">
    <div class="page-header">
      <h1>消息中心</h1>
      <p>查看系统通知、收藏提醒和互动消息。</p>
    </div>

    <div class="message-list">
      <article class="message-card">
        <h3>欢迎使用校园轻集市</h3>
        <p>你可以在这里发布二手商品、失物招领、拼单搭子和跑腿委托。</p>
      </article>

      <article class="message-card">
        <h3>功能提示</h3>
        <p>收藏的信息可以在个人中心中查看。</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
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

.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-card {
  padding: 18px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.message-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.message-card p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}
</style>
