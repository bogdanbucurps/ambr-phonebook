<template>
  <Dialog
    :visible="isVisible"
    :closable="false"
    :draggable="false"
    modal
    header="Add Contact"
    class="add-contact-modal"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    @hide="resetData"
  >
    <InputText v-model="data.firstName" type="text" placeholder="First Name" />

    <InputText v-model="data.lastName" type="text" placeholder="Last Name" />

    <div class="p-inputgroup">
      <div class="p-inputgroup-addon">
        <Dropdown v-model="data.country" :options="countries" option-label="label" option-value="value" />
      </div>

      <InputText
        v-model="data.phoneNumber"
        type="text"
        placeholder="Phone Number"
        :disabled="data.country === ''"
        @input="formatPhoneNumber"
      />
    </div>

    <template #footer>
      <Button class="cancel" @click="$emit('setAddContactModalVisibility')">
        Cancel
      </Button>

      <Button class="add" @click="addContact">
        Add
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js'

const { $toast } = useNuxtApp()

const emit = defineEmits(['addContact', 'setAddContactModalVisibility'])
defineProps<{
  isVisible: boolean;
  countries: { id: CountryCode; name: string | undefined; label: string; value: CountryCode }[];
}>()

const data = reactive({
  firstName: '',
  lastName: '',
  country: 'US',
  phoneNumber: ''
})

const formatPhoneNumber = () => {
  const phoneNumber = data.phoneNumber
  const countryCode = data.country as CountryCode

  const PhoneNumber = parsePhoneNumber(phoneNumber, countryCode)

  if (PhoneNumber?.isValid()) {
    data.phoneNumber = PhoneNumber.formatNational()
  }
}

const addContact = () => {
  const PhoneNumber = parsePhoneNumber(data.phoneNumber, data.country as CountryCode)

  if (!PhoneNumber?.isValid()) {
    return $toast.error('Please enter a valid phone number', {
      position: 'top-right'
    })
  }

  return emit('addContact', {
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber
  })
}

const resetData = () => {
  data.firstName = ''
  data.lastName = ''
  data.country = 'US'
  data.phoneNumber = ''
}
</script>

<style lang="scss">
.add-contact-modal {
  width: 30rem;

  .p-dialog-header {
    display: flex;
    justify-content: center;
  }

  .p-dialog-content {
    display: flex;
    flex-direction: column;

    .p-inputtext {
      margin-bottom: 1rem;
    }

    .p-inputgroup {
      &-addon {
        padding: 0;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        align-items: unset;
        min-width: unset;
        background: none;
        border: none;

        .p-dropdown {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          height: 2.75rem;
          min-width: 5rem;

          &-label {
            margin: 0;
          }

          &-trigger {
            display: none;
          }
        }
      }
    }
  }
}
</style>
