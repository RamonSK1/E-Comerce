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
  <!-- <article class="w-[200px]">
    <h2>{{ product.name }}</h2>
    <p>Categoria: {{ product.category.name }}</p>
    <p>Descrição: {{ product.description }}</p>
    <p>R$: {{ product.price.toFixed(2).replace('.', ',') }}</p>

    <button @click="handleAdd">
      Adicionar
    </button>
  </article> -->
  <Card
  :style="{width:'100%', minWidth:'200px', maxWidth:'220px'}">
    <template #header>
      <img :src="'https://picsum.photos/200'" class="w-full object-cover"/>
    </template>
    <template #title>
      <h1>{{ product.name }}</h1>
    </template>
    <template #content>
      <p>Categoria: {{ product.category.name }}</p>
    <p>Descrição: {{ product.description }}</p>
    <p>R$: {{ product.price.toFixed(2).replace('.', ',') }}</p>
    </template>
    <template #footer>
      <div class="flex flex-row-reverse">
        <Button @click="handleAdd">Adicionar</Button>
      </div>
    </template>
  </Card>
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