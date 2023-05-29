import { Prisma } from '@prisma/client'

export type Contact = Prisma.PhonebookGetPayload<{
  select: {
    id: true
    firstName: true
    lastName: true
    phoneNumber: true
  }
}>
