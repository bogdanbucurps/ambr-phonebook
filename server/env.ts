import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url()
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  process.exit(1)
}

export default env.data
