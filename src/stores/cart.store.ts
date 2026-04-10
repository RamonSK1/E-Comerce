import { defineStore } from 'pinia'
import { Cart } from '@/model/cart.model'
import type { Product } from '@/model/product.model'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: new Cart()
  }),
  actions: {
    addItem(product: Product) {
      this.cart.addItem(product, 1)
    },
    removeItem(product: Product) {
      this.cart.removeItem(product)
    },
    decrementItem(product: Product) {
      this.cart.decrementItem(product)
    }
  }
})