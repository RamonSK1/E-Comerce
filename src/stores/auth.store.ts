//import { resolve } from 'path'
import { defineStore } from 'pinia'

export type UserRole = 'Custumer' | 'Admin'

export interface User {
  name: String
  email: String
  role: UserRole
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
    isLoading: false,
    //role: null as UserRole | null,
  }),

  getters: {
    role: (state) => state.user?.role ?? null,
  },

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email && password) {
        this.user = { name: 'Ramon', email, role: 'Custumer' }
        this.token = 'fake-token-123'
        this.isAuthenticated = true
      }

      this.isLoading = false
    },

    async register(name: string, email: string, password: string) {
      this.isLoading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.user = { name, email, role: 'Custumer' }
      this.token = 'fake-token-123'
      this.isAuthenticated = true

      this.isLoading = false
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.isLoading = false
    },
    /*login(role: UserRole) {
      ;((this.isAuthenticated = true), (this.role = role))
    },
    logout() {
      ;((this.isAuthenticated = false), (this.role = null))
    }*/
  },
})
