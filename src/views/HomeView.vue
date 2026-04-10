<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '@/components/card/ProductCard.vue'
import { Category } from '@/model/category.model'
import { Product } from '@/model/product.model'
import { useCartStore } from '@/stores/cart.store'

export default defineComponent({
  components: { ProductCard },

  data() {
    const cat1 = new Category(1, "Instrumento")
    const cat2 = new Category(2, "Instrumento elétrico")

    return {
      products: [
        new Product(1, "Violão", 500, "Violão acústico", cat1),
        new Product(2, "Guitarra", 600, "Guitarra elétrica", cat2)
      ],
      /* cart: new Cart() */
    }
  },
    /* uso do pinia */
    setup() {
        const cartStore = useCartStore()
        return {cartStore}
    },

  methods: {
    addToCart(product: Product) {
      this.cartStore.addItem(product)
    }
  }
})
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">Produtos</h1>
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add="addToCart"
      />
    </section>
  </main>
</template>