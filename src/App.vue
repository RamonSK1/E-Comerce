<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from './components/card/ProductCard.vue'
import { Category } from './model/category.model'
import { Product } from './model/product.model'
import { Cart } from './model/cart.model'

export default defineComponent({
  components: {
    ProductCard
  },

  data() {
    const cat1 = new Category(1, "Instrumento")
    const cat2 = new Category(2, "Instrumento elétrico")
    
    return {
      products: [
        new Product(1, "Violão", 500,"teste", cat1),
        new Product(2, "Guitarra", 600,"teste", cat2)
        
      ],

      cartItems: [] as { product: Product; quantity: number }[],
      cart: new Cart()
    }
  },

  methods: {
    addToCart(product: Product) {
      this.cart.addItem(product, 1)
    },

    getTotalItems(){
      return this.cartItems.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    },

    getFinalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.product.price * item.quantity)
      }, 0)
    }
  }
})
</script>



<template>
  <main>
    <h1>Produtos</h1>

    <!-- lista de produtos -->
    <div>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add="addToCart"
      />
    </div>

    <hr />

    <!-- carrinho -->
    <section>
      <h2>Carrinho</h2>
      <p>Total de itens: {{ cart.getTotalItens() }}</p>
      <p>Preço total: R$ {{ cart.getFinalPrice().toFixed(2).replace('.',',') }}</p>
    </section>
    <ul>
      <li v-for="item in cartItems" :key="item.product.id">
        {{ item.product.name }} = {{ item.quantity }}
      </li>
    </ul>
  </main>
</template>

<style>
main {
  padding: 20px;
}
</style>