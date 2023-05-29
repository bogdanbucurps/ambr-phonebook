<template>
  <section class="phonebook-section">
    <div class="phonebook">
      <div class="header">
        <Icon name="mdi:card-account-phone" size="2rem" />
        <span>PhoneBook App</span>
      </div>

      <div class="list-header">
        <span>Contacts</span>

        <Button @click="data.isAddContactModalVisible = true">
          <Icon name="mdi:plus" />
          Add Contact
        </Button>
      </div>

      <div class="search p-input-icon-left">
        <Icon name="mdi:magnify" />
        <InputText v-model="data.search" type="text" placeholder="Search by Last Name" @input="searchContacts" />
      </div>

      <div class="contact-list">
        <div v-for="(contact, index) in contacts" :key="`contact-${index}`" class="contact-list-item">
          <div class="main">
            <div class="details">
              <span class="name">{{ contact.firstName }} {{ contact.lastName }}</span>
              <span class="phone-number">
                <Icon name="mdi:phone" />
                {{ contact.phoneNumber }}
              </span>
            </div>

            <div class="actions">
              <Button class="edit">
                <Icon name="mdi:account-edit-outline" @click="selectContactForEdit(contact.id)" />
              </Button>

              <Button class="remove" @click="removeContact(contact.id)">
                <Icon name="mdi:delete-forever" />
              </Button>
            </div>
          </div>

          <UpdateContact
            :visible="data.selectableContacts[contact.id] || false"
            :countries="countries"
            :contact="contact"
            @set-update-section-state="setUpdateSection"
          />
        </div>
      </div>

      <AddContactModal
        :is-visible="data.isAddContactModalVisible"
        :countries="countries"
        @add-contact="addContact"
        @set-add-contact-modal-visibility="setAddContactModalVisibility"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { TRPCError } from '@trpc/server'
import * as countryCodeLookup from 'country-code-lookup'
import { getCountries, getCountryCallingCode } from 'libphonenumber-js'
import { storeToRefs } from 'pinia'

import { Contact } from '~/server/types'

const phonebookStore = usePhonebookStore()
const { contacts } = storeToRefs(phonebookStore)
const { $toast } = useNuxtApp()

onMounted(async () => {
  await phonebookStore.init()
})

const countries = useOrderBy(getCountries().map((country) => {
  const name = countryCodeLookup.byIso(country)?.country
  const callingCode = getCountryCallingCode(country)

  return {
    id: country,
    name,
    label: `${name} +${callingCode}`,
    value: country
  }
}).filter(country => country.name), 'name')

const data = reactive({
  search: '',
  isAddContactModalVisible: false,
  isUpdateContactModalVisible: false,
  newContact: {
    firstName: '',
    lastName: '',
    country: '',
    phoneNumber: ''
  },
  selectableContacts: contacts.value.reduce((acc, curr) => {
    acc[curr.id] = false

    return acc
  }, {} as Record<number, boolean>)
})

const searchContacts = () => phonebookStore.searchContacts(data.search)

const setAddContactModalVisibility = () => {
  data.isAddContactModalVisible = !data.isAddContactModalVisible
}

const selectContactForEdit = (id: number) => {
  if (data.selectableContacts[id] === true) {
    data.selectableContacts[id] = false

    return
  }

  for (const contact of Object.keys(data.selectableContacts)) {
    data.selectableContacts[+contact] = false
  }

  data.selectableContacts[id] = true
}

const setUpdateSection = (id: number) => {
  data.selectableContacts[id] = !data.selectableContacts[id]
}

const addContact = async (contact: Contact) => {
  if (!contact.firstName || contact.firstName.trim() === '') {
    return $toast.error('First Name is required', { position: 'top-right' })
  }

  if (!contact.lastName || contact.lastName.trim() === '') {
    return $toast.error('Last Name is required', { position: 'top-right' })
  }

  if (!contact.phoneNumber || contact.phoneNumber.trim() === '') {
    return $toast.error('Phone number is required', { position: 'top-right' })
  }

  try {
    await phonebookStore.addContact(contact)

    data.isAddContactModalVisible = false
    $toast.success('Contact added successfully', { position: 'top-right' })
  } catch (error) {
    const err = (error as TRPCError)

    $toast.error(err.message, { position: 'top-right' })
  }
}

const removeContact = async (id: number) => {
  try {
    await phonebookStore.removeContact(id)

    $toast.success('Contact removed successfully', { position: 'top-right' })
  } catch (error) {
    const err = (error as TRPCError)

    $toast.error(err.message, { position: 'top-right' })
  }
}
</script>

<style scoped src="@/assets/scss/pages/phonebook.scss"></style>
