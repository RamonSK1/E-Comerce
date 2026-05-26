import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import Admin from '@/views/Admin.vue'
import ProductsAdmin from '@/views/Admin/ProductsAdmin.vue'
import Reports from '@/views/Admin/Reports.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true }, //aqui o guard adicionado
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAdmin: true },
      children: [
        { path: '', redirect: '/admin/products' },
        { path: 'products', name: 'admin-products', component: ProductsAdmin },
        { path: 'reports', name: 'admin-reports', component: Reports },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.requiresAdmin && auth.role !== 'Admin') {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
