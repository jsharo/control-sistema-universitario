export class CreateDocenteDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  documento: string; // DNI, cédula, etc.
  especialidad: string;
  activo: boolean;
}
