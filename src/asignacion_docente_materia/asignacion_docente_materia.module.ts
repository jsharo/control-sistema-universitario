import { Module } from '@nestjs/common';
import { AsignacionDocenteMateriaService } from './asignacion_docente_materia.service';
import { AsignacionDocenteMateriaController } from './asignacion_docente_materia.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AsignacionDocenteMateriaController],
  providers: [AsignacionDocenteMateriaService, PrismaService],
})
export class AsignacionDocenteMateriaModule {}