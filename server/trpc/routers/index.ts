import { router } from '../trpc'

import { phonebook } from './phonebook'

export const appRouter = router({
  phonebook
})

export type AppRouter = typeof appRouter
