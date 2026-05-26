<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useToast } from 'primevue'

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const v$ = useVuelidate()
    const toast = useToast()
    return { authStore, router, v$, toast }
  },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },

  validations() {
    return {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
      },
    }
  },

  methods: {
    async handleSubmit() {
      const valid = await this.v$.$validate()
      if (!valid) return

      await this.authStore.login(this.form.email, this.form.password)
      //
      if (this.authStore.isAuthenticated) {
        this.toast.add({
          severity: 'success',
          summary: 'SUcesso',
          detail: 'Login realizado',
          life: 3000,
        })
        const redirect = this.router.currentRoute.value.query.redirect as string
        this.router.push(redirect || '/') // home
        //this.router.push('/')
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Credenciais Invalidas',
          life: 3000,
        })
      }
    },
  },
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <Card class="w-full max-w-md">
      <template #title>Login</template>
      <template #content>
        <div class="flex flex-col gap-4">
          <!-- EMAIL -->
          <div class="flex flex-col gap-1">
            <label>Email</label>
            <InputText
              v-model="form.email"
              placeholder="seu@email.com"
              :class="{ 'border-red-500': v$.form.email.$error }"
            />
            <span v-if="v$.form.email.$error" class="text-red-500 text-sm"> Email inválido. </span>
          </div>

          <!-- SENHA -->
          <div class="flex flex-col gap-1">
            <label>Senha</label>
            <Password
              v-model="form.password"
              toggleMask
              :feedback="false"
              :class="{ 'border-red-500': v$.form.password.$error }"
            />
            <span v-if="v$.form.password.$error" class="text-red-500 text-sm">
              Senha obrigatória.
            </span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-col gap-2">
          <Button
            label="Entrar"
            icon="pi pi-sign-in"
            :loading="authStore.isLoading"
            @click="handleSubmit"
            class="w-full"
          />
          <router-link to="/register">
            <Button label="Criar conta" severity="secondary" class="w-full" />
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>
