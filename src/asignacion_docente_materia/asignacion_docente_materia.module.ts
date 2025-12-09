import { Module } from '@nestjs/common';
import { AsignacionDocenteMateriaService } from './asignacion_docente_materia.service';
import { AsignacionDocenteMateriaController } from './asignacion_docente_materia.controller';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Module({
  controllers: [AsignacionDocenteMateriaController],
  providers: [AsignacionDocenteMateriaService, AcademicoPrismaService],
})
export class AsignacionDocenteMateriaModule {}