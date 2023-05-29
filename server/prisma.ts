import { PrismaClient } from '@prisma/client'

import env from './env'

export default new PrismaClient({ datasources: { db: { url: env.DATABASE_URL } } })
