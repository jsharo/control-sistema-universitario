import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'prisma/generated/auth/client'
import * as dotenv from 'dotenv'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class AcademicoPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool
  
  constructor() {
    dotenv.config()
    const url = process.env.DATABASE_URL_ACADEMICO
    if (!url) {
      throw new Error('DATABASE_URL_ACADEMICO no está configurado')
    }
    const pool = new Pool({ connectionString: url })
    const adapter = new PrismaPg(pool)
    super({ adapter })
    this.pool = pool
  }
  async onModuleInit() {
    await this.$connect()
  }
  async onModuleDestroy() {
    await this.$disconnect()
    await this.pool?.end()
  }
}
