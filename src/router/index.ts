import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TradeView from '../views/TradeView.vue'
import LostFoundView from '../views/LostFoundView.vue'
import GroupBuyView from '../views/GroupBuyView.vue'
import ErrandView from '../views/ErrandView.vue'
import PublishView from '../views/PublishView.vue'
import MessageView from '../views/MessageView.vue'
import UserCenterView from '../views/UserCenterView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/trade',
      name: 'trade',
      component: TradeView,
      meta: {
        title: '二手交易',
      },
    },
    {
      path: '/lost-found',
      name: 'lostFound',
      component: LostFoundView,
      meta: {
        title: '失物招领',
      },
    },
    {
      path: '/group-buy',
      name: 'groupBuy',
      component: GroupBuyView,
      meta: {
        title: '拼单搭子',
      },
    },
    {
      path: '/errand',
      name: 'errand',
      component: ErrandView,
      meta: {
        title: '跑腿委托',
      },
    },
    {
      path: '/publish',
      name: 'publish',
      component: PublishView,
      meta: {
        title: '发布信息',
      },
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView,
      meta: {
        title: '消息中心',
      },
    },
    {
      path: '/user',
      name: 'user',
      component: UserCenterView,
      meta: {
        title: '个人中心',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: '注册',
      },
    },
  ],
})

export default router
