<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    return { router, route }
  },

  data() {
    return {
      menuItems: [
        {
          label: 'Produtos',
          icon: 'pi pi-box',
          items: [
            {
              label: 'Listar produtos',
              icon: 'pi pi-list',
              command: () => this.$router.push('/admin'),
            },
          ],
        },
        {
          label: 'Relatorios',
          icon: 'pi pi-chart-bar',
          items: [
            {
              label: 'Relatorio de Vendas',
              icon: 'pi pi-dollar',
              command: () => this.$router.push('/admin/reports'),
            },
          ],
        },
      ],
    }
  },

  computed: {
    breadcrumbs() {
      return this.route.matched.map((r) => ({
        label: r.name?.toString() ?? r.path,
        command: () => this.router.push(r.path),
      }))
    },
    home() {
      return { icon: 'pi pi-home', command: () => this.router.push('/') }
    },
  },
})
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="w-64 shadow-lg p-4">
      <h2 class="text-lg font-bold mb-4">Admin</h2>
      <PanelMenu :model="menuItems"></PanelMenu>
    </aside>

    <main class="flex-1 p-6">
      <Breadcrumb :home="home" :model="breadcrumbs" class="mb-6"></Breadcrumb>
      <router-view></router-view>
    </main>
  </div>
</template>
