<script setup lang="ts">
import type { Product } from '@/model/product.model';

// define a prop tipada
const props = defineProps<{
  product: Product
}>()

// define o evento que será emitido
const emit = defineEmits<{
  (e: 'add', product: Product): void
}>()

// função chamada no botão
function handleAdd() {
  emit('add', props.product)
}
</script>

<template>
  <article>
    <h2>{{ product.name }}</h2>
    <p>Categoria: {{ product.category.name }}</p>
    <p>Descrição: {{ product.description }}</p>
    <p>R$: {{ product.price.toFixed(2).replace('.', ',') }}</p>

    <button @click="handleAdd">
      Adicionar
    </button>
  </article>
</template>

<style scoped>
article {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}
button {
  margin-top: 10px;
  cursor: pointer;
}
</style>