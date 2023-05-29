import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'

import DialogService from 'primevue/dialogservice'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.use(DialogService)

  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('Dialog', Dialog)
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('MultiSelect', MultiSelect)
  nuxtApp.vueApp.component('Dropdown', Dropdown)
})
