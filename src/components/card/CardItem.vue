<script setup lang="ts">
import type { listProduct } from '@/model/cart.model'
import type { Product } from '@/model/product.model'

// props
const props = defineProps<{
  item: listProduct
}>()

// emits tipados
const emit = defineEmits<{
  (e: 'decrementItem', product: Product): void
  (e: 'incrementItem', product: Product): void
  (e: 'removeItem', product: Product): void
}>()

// ações
/* function handleDecrement() {
  emit('decrementItem', props.item.product)
}

function handleIncrement() {
  emit('incrementItem', props.item.product)
} */
function handleQuantityChange(newQty: number | null) {
  if (newQty === null) return
  const diff = newQty - props.item.quantity
  if (diff > 0) emit('incrementItem', props.item.product)
  else if (diff < 0) emit('decrementItem', props.item.product)
}

function handleRemove() {
  emit('removeItem', props.item.product)
}

// util
function formatPrice(value: number) {
  return value.toFixed(2).replace('.', ',')
}
</script>

<template>
  <Card :style="{ width: '100%', minWidth: '200px', maxWidth: '420px' }">
    <template #title>
      <div class="flex flex-row gap-2">
        <img :src="'https://picsum.photos/300'" class="w-20" />
        <h1>{{ item.product.name }}</h1>
      </div>
    </template>
    <template #content>
      <p>Categoria: {{ item.product.category.name }}</p>
      <p>Descrição: {{ item.product.description }}</p>
      <p>R$: {{ formatPrice(item.product.price) }}</p>
      <p class="font-bold mt-2">
        total: R$ {{ formatPrice(item.product.price * item.quantity) }}
      </p>
    </template>

    <!-- FOOTER -->
    <template #footer>
      <div class="flex items-center justify-between">

        <!-- CONTROLE DE QUANTIDADE -->
        <!-- <div class="flex items-center gap-2">
          <Button @click="handleDecrement">-</Button>
          <span>{{ item.quantity }}</span>
          <Button @click="handleIncrement">+</Button>
        </div> -->
        <InputNumber
          :modelValue="item.quantity"
          @update:modelValue="handleQuantityChange"
          :min="1"
          showButtons
          buttonLayout="horizontal"
          :step="1"
        />

        <!-- REMOVER -->
        <Button severity="danger" @click="handleRemove">
          Remover
        </Button>

      </div>
    </template>

  </Card>
</template>