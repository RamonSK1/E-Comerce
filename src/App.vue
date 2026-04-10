<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/auth.store'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    return { authStore, router }
  },

  computed: {
    menuItems() {
      return [
        { label: 'Home', icon: 'pi pi-home', command: () => this.router.push('/') },
        {
          label: 'Carrinho',
          icon: 'pi pi-shopping-cart',
          command: () => this.router.push('/cart'),
        },
        { label: 'Admin', icon: 'pi pi-cog', command: () => this.router.push('/admin') },
      ]
    },
  },
  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle('dark')
    },
    loginCustomer() {
      this.authStore.login('Custumer')
    },
    loginAdmin() {
      this.authStore.login('Admin')
    },
    logout() {
      this.authStore.logout()
    },
  },
})
</script>

<template>
  <ConfirmDialog />

  <!-- MeNUBAR -->

  <Menubar :model="menuItems" class="px-4">
    <template #start>
      <span class="text-xl font-bold mr-4">🎸 Loja</span>
    </template>
    <template #end>
      <div class="flex gap-2 items-center">
        <span v-if="authStore.isAuthenticated" class="text-sm text-gray-500">
          {{ authStore.role }}
        </span>
        <Button
          v-if="!authStore.isAuthenticated"
          @click="loginCustomer"
          label="Login Customer"
          severity="secondary"
          size="small"
        ></Button>
        <Button
          v-if="!authStore.isAuthenticated"
          @click="loginAdmin"
          label="Login Admin"
          severity="secondary"
          size="small"
        ></Button>
        <Button
          v-if="authStore.isAuthenticated"
          @click="logout"
          label="Logout"
          severity="danger"
          size="small"
        ></Button>
        <Button @click="toggleDarkMode" icon="pi pi-moon" label="Alternar tema" />
      </div>
    </template>
  </Menubar>

  <router-view />
</template>
