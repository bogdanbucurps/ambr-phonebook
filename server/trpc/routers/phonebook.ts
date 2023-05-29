import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { procedure, router } from '../trpc'
import prisma from '../../prisma'

export const phonebook = router({
  list: procedure.input(z.object({ search: z.optional(z.string()) })).query(({ input }) => {
    return prisma.phonebook.findMany({
      where: { lastName: { contains: input.search, mode: 'insensitive' } }
    })
  }),

  create: procedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const contact = await prisma.phonebook.findFirst({
        where: { phoneNumber: input.phoneNumber }
      })

      if (contact) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Contact already exists'
        })
      }

      await prisma.phonebook.create({ data: input })
    }),

  remove: procedure.input(z.number()).mutation(async ({ input }) => {
    await prisma.phonebook.delete({ where: { id: input } })
  }),

  update: procedure
    .input(
      z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string()
      })
    )
    .mutation(async ({ input }) => {
      await prisma.phonebook.update({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          phoneNumber: input.phoneNumber
        },
        where: { id: input.id }
      })
    })
})
