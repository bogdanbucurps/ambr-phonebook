<template>
  <div class="edit-form" :class="{ 'visible': props.visible }">
    <InputText v-model="data.firstName" type="text" placeholder="First Name" />

    <InputText v-model="data.lastName" type="text" placeholder="Last Name" />

    <div class="p-inputgroup">
      <div class="p-inputgroup-addon">
        <Dropdown v-model="data.country" :options="props.countries" option-label="label" option-value="value" />
      </div>

      <InputText
        v-model="data.phoneNumber"
        type="text"
        placeholder="Phone Number"
        :disabled="data.country === ''"
        @input="formatPhoneNumber"
      />
    </div>

    <div class="actions">
      <Button class="add" @click="updateContact">
        Update
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TRPCError } from '@trpc/server'
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js'

import { Contact } from '~/server/types'

const { $toast } = useNuxtApp()
const phonebookStore = usePhonebookStore()

const props = defineProps<{
  visible: boolean;
  countries: { id: CountryCode; name: string | undefined; label: string; value: CountryCode }[];
  contact: Contact;
}>()
const emit = defineEmits(['setUpdateSectionState'])

const data = reactive({
  firstName: ref(props.contact.firstName),
  lastName: ref(props.contact.lastName),
  country: ref('US'),
  phoneNumber: ref(props.contact.phoneNumber)
})

const formatPhoneNumber = () => {
  const phoneNumber = data.phoneNumber
  const countryCode = data.country as CountryCode

  const PhoneNumber = parsePhoneNumber(phoneNumber, countryCode)

  if (PhoneNumber?.isValid()) {
    data.phoneNumber = PhoneNumber.formatNational()
  }
}

const updateContact = async () => {
  if (!data.firstName || data.firstName.trim() === '') {
    return $toast.error('First Name is required', { position: 'top-right' })
  }

  if (!data.lastName || data.lastName.trim() === '') {
    return $toast.error('Last Name is required', { position: 'top-right' })
  }

  if (!data.phoneNumber || data.phoneNumber.trim() === '') {
    return $toast.error('Phone number is required', { position: 'top-right' })
  }

  try {
    await phonebookStore.updateContact({
      id: props.contact.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber
    })

    emit('setUpdateSectionState', props.contact.id)

    $toast.success('Contact updated successfully', { position: 'top-right' })

    getCurrentInstance()?.proxy?.$forceUpdate()
  } catch (error) {
    const err = (error as TRPCError)

    $toast.error(err.message, { position: 'top-right' })
  }
}
</script>
