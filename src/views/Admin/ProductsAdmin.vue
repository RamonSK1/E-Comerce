<script lang="ts">
import { defineComponent } from 'vue'
import { Category } from '@/model/category.model'
import { Product } from '@/model/product.model'

export default defineComponent({
  data() {
    const cat1 = new Category(1, 'Instrumento')
    const cat2 = new Category(2, 'Instrumento eletrico')

    return {
      products: [
        new Product(1, 'Violão', 500, 'Violão acústico', cat1),
        new Product(2, 'Guitarra', 600, 'Guitarra eletrica', cat2),
      ],
    }
  },
})
</script>

<template>
  <div>
    <h2 class="text-x1 font-bold mb-4">Produtos</h2>

    <DataTable :value="products" stripedRows class="w-full">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Nome"></Column>
      <Column field="price" header="Preço">
        <template #body="{ data }"> R$ {{ data.price.toFixed(2).replace('.', ',') }} </template>
      </Column>
      <Column field="category.name" header="Categoria"></Column>
      <Column field="description" header="Descrição">n</Column>
    </DataTable>
  </div>
</template>
