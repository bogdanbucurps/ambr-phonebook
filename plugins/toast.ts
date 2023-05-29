import { useToast } from 'vue-toast-notification'

export default defineNuxtPlugin(() => ({
  provide: {
    toast: useToast()
  }
}))
