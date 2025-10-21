import { Module } from '@nestjs/common';
import { AsignacionDocenteMateriaService } from './asignacion_docente_materia.service';
import { AsignacionDocenteMateriaController } from './asignacion_docente_materia.controller';

@Module({
  controllers: [AsignacionDocenteMateriaController],
  providers: [AsignacionDocenteMateriaService],
})
export class AsignacionDocenteMateriaModule {}
