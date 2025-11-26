export class CreateDocenteDto {
  codigo_docente: string;
  nombres: string;
  apellidos: string;
  email?: string;
  telefono?: string;
  especialidad?: string;
  estado?: 'activo' | 'inactivo';
}
