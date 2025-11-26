export class CreateCarreraDto {
  nombre: string;
  duracion_semestres?: number;
  descripcion?: string;
  estado?: 'activo' | 'inactivo';
}