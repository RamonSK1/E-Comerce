<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },

  validations() {
    return {
      form: {
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirmPassword: {
          required,
          sameAsPassword: helpers.withMessage(
            'As senhas não coincidem',
            (value: string) => value === this.form.password,
          ),
        },
      },
    }
  },

  methods: {
    async handleSubmit() {
      const valid = await this.v$.$validate()
      if (!valid) return

      await this.authStore.register(this.form.name, this.form.email, this.form.password)

      this.toast.add({
        severity: 'Sucess',
        summary: 'Conta criada',
        detail: 'Bem-vindo',
        life: 3000,
      })
      this.router.push('/')
    },
  },
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <Card class="w-full max-w-md">
      <template #title>Criar Conta</template>
      <template #content>
        <div class="flex flex-col gap-4">
          <!-- NOME -->
          <div class="flex flex-col gap-1">
            <label>Nome</label>
            <InputText
              v-model="form.name"
              placeholder="Seu nome"
              :class="{ 'border-red-500': v$.form.name.$error }"
            />
            <span v-if="v$.form.name.$error" class="text-red-500 text-sm"> Nome obrigatório. </span>
          </div>

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
              Senha deve ter no mínimo 6 caracteres.
            </span>
          </div>

          <!-- CONFIRMAR SENHA -->
          <div class="flex flex-col gap-1">
            <label>Confirmar Senha</label>
            <Password
              v-model="form.confirmPassword"
              toggleMask
              :feedback="false"
              :class="{ 'border-red-500': v$.form.confirmPassword.$error }"
            />
            <span v-if="v$.form.confirmPassword.$error" class="text-red-500 text-sm">
              {{ v$.form.confirmPassword.$errors[0]?.$message }}
            </span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-col gap-2">
          <Button
            label="Criar Conta"
            icon="pi pi-user-plus"
            :loading="authStore.isLoading"
            @click="handleSubmit"
            class="w-full"
          />
          <router-link to="/login">
            <Button label="Já tenho conta" severity="secondary" class="w-full" />
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>
