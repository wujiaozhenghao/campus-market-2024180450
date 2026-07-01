import { defineStore } from 'pinia'

export interface FavoriteItem {
  id: number
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  title: string
  description: string
  location?: string
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as FavoriteItem[],
  }),

  getters: {
    favoriteCount: (state) => state.favorites.length,
  },

  actions: {
    isFavorite(type: FavoriteItem['type'], id: number) {
      return this.favorites.some((item) => item.type === type && item.id === id)
    },

    addFavorite(item: FavoriteItem) {
      const exists = this.isFavorite(item.type, item.id)

      if (!exists) {
        this.favorites.push(item)
      }
    },

    removeFavorite(type: FavoriteItem['type'], id: number) {
      this.favorites = this.favorites.filter((item) => {
        return !(item.type === type && item.id === id)
      })
    },

    toggleFavorite(item: FavoriteItem) {
      if (this.isFavorite(item.type, item.id)) {
        this.removeFavorite(item.type, item.id)
      } else {
        this.addFavorite(item)
      }
    },
  },
})
