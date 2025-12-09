import { Module } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Module({
  controllers: [MateriaController],
  providers: [MateriaService, AcademicoPrismaService],
})
export class MateriaModule {}
