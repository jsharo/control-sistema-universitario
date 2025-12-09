import { Module } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Module({
  controllers: [DocenteController],
  providers: [DocenteService, AcademicoPrismaService],
})
export class DocenteModule {}
