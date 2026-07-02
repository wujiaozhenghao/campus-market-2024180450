<template>
  <section class="auth-page">
    <div class="auth-card">
      <h1>登录校园轻集市</h1>
      <p class="desc">登录后可以发布信息、收藏内容并进入个人中心。</p>

      <form class="auth-form" @submit.prevent="handleLogin">
        <FormField label="用户名" required :error="errors.username">
          <input v-model.trim="form.username" type="text" placeholder="请输入用户名" />
        </FormField>

        <FormField label="密码" required :error="errors.password">
          <input v-model.trim="form.password" type="password" placeholder="请输入密码" />
        </FormField>

        <p v-if="loginError" class="login-error">{{ loginError }}</p>

        <button class="primary" type="submit" :disabled="submitting">
          {{ submitting ? '登录中...' : '登录' }}
        </button>
      </form>

      <p class="switch">
        还没有账号？
        <RouterLink to="/register">去注册</RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import FormField from '../components/FormField.vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const submitting = ref(false)
const loginError = ref('')

const form = reactive({
  username: '',
  password: '',
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
  loginError.value = ''
}

function validateForm() {
  clearErrors()

  if (!form.username) {
    errors.username = '请输入用户名'
  }

  if (!form.password) {
    errors.password = '请输入密码'
  }

  return Object.values(errors).every((message) => !message)
}

async function handleLogin() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    await userStore.login(form.username, form.password)
    window.alert('登录成功')
    router.push('/user')
  } catch (error) {
    console.error(error)
    loginError.value = '账号或密码错误'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 120px);
  display: grid;
  place-items: center;
}

.auth-card {
  width: 420px;
  padding: 28px;
  border-radius: 16px;
  background: #fff;
}

.auth-card h1 {
  margin: 0 0 8px;
}

.desc {
  margin: 0 0 20px;
  color: #6b7280;
  line-height: 1.6;
}

.auth-form {
  display: grid;
  gap: 16px;
}

input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

.login-error {
  margin: 0;
  color: #dc2626;
  font-size: 14px;
}

.primary {
  border: none;
  border-radius: 8px;
  padding: 11px 16px;
  cursor: pointer;
  background: #2563eb;
  color: #fff;
  font-size: 15px;
}

.primary:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.switch {
  margin: 18px 0 0;
  text-align: center;
  color: #6b7280;
}
</style>
