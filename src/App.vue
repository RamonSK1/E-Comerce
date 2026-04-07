<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from './components/card/ProductCard.vue'
import CardItem from './components/card/CardItem.vue'
import { Category } from './model/category.model'
import { Product } from './model/product.model'
import { Cart } from './model/cart.model'

export default defineComponent({
  components: {
    ProductCard,
    CardItem
  },

  data() {
    const cat1 = new Category(1, "Instrumento")
    const cat2 = new Category(2, "Instrumento elétrico")

    return {
      products: [
        new Product(1, "Violão", 500, "Violão acústico", cat1),
        new Product(2, "Guitarra", 600, "Guitarra elétrica", cat2)
      ],

      cart: new Cart()
    }
  },

  methods: {
    addToCart(product: Product) {
      this.cart.addItem(product, 1)
    },
    removeFromCart(product: Product){
      this.cart.removeItem(product)
    },
    decrementFromCart(product: Product){
      this.cart.decrementItem(product)
    }
  }
})


</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">Produtos</h1>
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      <div v-for="product in products">
        <ProductCard
        :key="product.id"
        :product="product"
        @add="addToCart"
      />
      </div> 
    </section>
    <hr class="my-6" />
  </main>

  <div>
    <!-- CARRINHO -->
    <section>
      <h2 class="text-xl font-semibold mb-2">Carrinho</h2>
      <p>Total de itens: {{ cart.getTotalItems() }}</p>
      <p class="font-bold"> Preço total:R$ {{ cart.getFinalPrice().toFixed(2).replace('.', ',') }}</p>
      <!--  <ul class="mt-4 space-y-2">
        <li v-for="item in cart.cartItens" :key="item.product.id" class="border p-2 rounded">
         {{ item.product.name }} x {{ item.quantity }}
          <div class="mt-2 space-x-2">
            <button @click="decrementFromCart(item.product)"> Remover</button>
            <button @click="addToCart(item.product)">Adicionar</button>
            <button @click="removeFromCart(item.product)">Excluir</button>
          </div>
        </li> 

          <Card v-if="cart.cartItens.length === 0">
            <template #content>
              <p class="text-gray-400 text-center"> Seu carrinho está vazinho. Vamos comprar!</p>
            </template>
          </Card>
          <CardItem
           v-for="item in cart.cartItens"
           :key="item.product.id"
           :item="item"
           @decrementItem="decrementFromCart"
           @incrementItem="addToCart"
           @removeItem="removeFromCart"/>
      </ul> -->
    <!-- bloco usando o dataview-->
     <Card v-if="cart.cartItens.length === 0">
        <template #content>
          <p class="text-gray-400 text-center">Seu carrinho está vazinho. Vamos comprar!</p>
        </template>
      </Card>
      <DataView v-else :value="cart.cartItens">
        <template #list="{ items }">
          <CardItem
            v-for="item in items"
            :key="item.product.id"
            :item="item"
            @decrementItem="decrementFromCart"
            @incrementItem="addToCart"
            @removeItem="removeFromCart"
          />
        </template>
      </DataView>
    </section>
  </div>
</template>