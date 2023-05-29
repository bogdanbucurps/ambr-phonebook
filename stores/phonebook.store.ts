import { defineStore } from 'pinia'

import type { Contact } from '../server/types'

export const usePhonebookStore = defineStore('phonebook', {
  state: () => ({
    contacts: [] as Contact[]
  }),

  getters: {
    getContacts: state => state.contacts
  },

  actions: {
    async init(): Promise<void> {
      const { $trpc } = useNuxtApp()

      this.contacts = await $trpc.phonebook.list.query({})
    },

    async searchContacts(search: string): Promise<void> {
      const { $trpc } = useNuxtApp()

      if (!search || search.trim() === '') {
        return this.init()
      }

      this.contacts = await $trpc.phonebook.list.query({ search })
    },

    async addContact(contact: Contact): Promise<void> {
      const { $trpc } = useNuxtApp()

      await $trpc.phonebook.create.mutate(contact)
      await this.init()
    },

    async removeContact(id: number): Promise<void> {
      const { $trpc } = useNuxtApp()

      await $trpc.phonebook.remove.mutate(id)
      await this.init()
    },

    async updateContact(contact: Contact): Promise<void> {
      const { $trpc } = useNuxtApp()

      await $trpc.phonebook.update.mutate(contact)
    }
  }
})
