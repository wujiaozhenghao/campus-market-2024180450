import { defineStore } from 'pinia'

export interface CurrentUser {
  id: number
  name: string
  college: string
  grade: string
  avatar: string
  bio: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: true,
    currentUser: {
      id: 1,
      name: '校园用户',
      college: '计算机学院',
      grade: '2023 级',
      avatar: '',
      bio: '热爱校园生活，喜欢分享闲置好物。',
    } as CurrentUser,
  }),

  getters: {
    displayName: (state) => state.currentUser.name,
    userDescription: (state) => {
      return `${state.currentUser.college} · ${state.currentUser.grade}`
    },
  },

  actions: {
    updateProfile(payload: Partial<CurrentUser>) {
      this.currentUser = {
        ...this.currentUser,
        ...payload,
      }
    },

    logout() {
      this.isLoggedIn = false
    },

    login() {
      this.isLoggedIn = true
    },
  },
})
