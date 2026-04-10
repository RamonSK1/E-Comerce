<script lang="ts">
import { defineComponent } from 'vue'
import CartItem from '@/components/card/CartItem.vue'
import { useCartStore } from '@/stores/cart.store';
import { Product } from '@/model/product.model'

export default defineComponent({
  components: { CartItem },

  setup(){
    const cartStore = useCartStore()
    return {cartStore}
  },

  methods: {
    addToCart(product: Product) {
      this.cartStore.addItem(product)
    },
    removeFromCart(product: Product) {
      this.cartStore.removeItem(product)
    },
    decrementFromCart(product: Product) {
      this.cartStore.decrementItem(product)
    }
  }
})
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">🛒 Carrinho</h1>
    <p>Total de itens: {{ cartStore.cart.getTotalItems() }}</p>
    <p class="font-bold mb-4">Preço total: R$ {{ cartStore.cart.getFinalPrice().toFixed(2).replace('.', ',') }}</p>

    <Card v-if="cartStore.cart.cartItens.length === 0">
      <template #content>
        <p class="text-gray-400 text-center">Seu carrinho está vazinho. Vamos comprar!</p>
      </template>
    </Card>

    <DataView v-else :value="cartStore.cart.cartItens">
      <template #list="{ items }">
        <CartItem
          v-for="item in items"
          :key="item.product.id"
          :item="item"
          @decrementItem="decrementFromCart"
          @incrementItem="addToCart"
          @removeItem="removeFromCart"
        />
      </template>
    </DataView>
  </main>
</template>