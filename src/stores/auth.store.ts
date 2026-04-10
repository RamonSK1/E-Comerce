import { defineStore } from 'pinia'

export type UserRole = 'Custumer' | 'Admin'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    role: null as UserRole | null,
  }),
  actions: {
    login(role: UserRole) {
      ;((this.isAuthenticated = true), (this.role = role))
    },
    logout() {
      ;((this.isAuthenticated = false), (this.role = null))
    },
  },
})
