import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignacionDocenteMateriaDto } from './create-asignacion_docente_materia.dto';

export class UpdateAsignacionDocenteMateriaDto extends PartialType(CreateAsignacionDocenteMateriaDto) {}
