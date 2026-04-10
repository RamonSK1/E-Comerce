<script lang="ts">
import { defineComponent } from 'vue'
import { Category } from '@/model/category.model'
import { Product } from '@/model/product.model'
import { useCartStore } from '@/stores/cart.store'

export default defineComponent({
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },

  data() {
    const cat1 = new Category(1, "Instrumento")
    const cat2 = new Category(2, "Instrumento elétrico")

    const products = [
      new Product(1, "Violão", 500, "Violão acústico", cat1),
      new Product(2, "Guitarra", 600, "Guitarra elétrica", cat2)
    ]

    return { products }
  },

  computed: {
    product() {
      const id = Number(this.$route.params.id)
      return this.products.find(p => p.id === id) ?? null
    }
  },

  methods: {
    addToCart() {
      if (this.product) {
        this.cartStore.addItem(this.product)
      }
    }
  }
})
</script>

<template>
  <main class="p-6">

    <!-- PRODUTO NÃO ENCONTRADO -->
    <Card v-if="!product">
      <template #content>
        <div class="text-center space-y-4">
          <p class="text-gray-400 text-lg">Produto não encontrado.</p>
          <router-link to="/">
            <Button label="Voltar para a Home" icon="pi pi-home" />
          </router-link>
        </div>
      </template>
    </Card>

    <!-- DETALHES DO PRODUTO -->
    <Card v-else>
      <template #header>
        <img src="https://picsum.photos/600/300" class="w-full object-cover rounded-t" />
      </template>
      <template #title>
        {{ product.name }}
      </template>
      <template #content>
        <p class="text-gray-500">Categoria: {{ product.category.name }}</p>
        <p class="mt-2">{{ product.description }}</p>
        <p class="text-xl font-bold mt-4">
          R$ {{ product.price.toFixed(2).replace('.', ',') }}
        </p>
      </template>
      <template #footer>
        <Button label="Adicionar ao carrinho" icon="pi pi-cart-plus" @click="addToCart" />
      </template>
    </Card>

  </main>
</template>