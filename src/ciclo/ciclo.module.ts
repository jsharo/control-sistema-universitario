import { Module } from '@nestjs/common';
import { CicloService } from './ciclo.service';
import { CicloController } from './ciclo.controller';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Module({
  controllers: [CicloController],
  providers: [CicloService, AcademicoPrismaService],
})
export class CicloModule {}
