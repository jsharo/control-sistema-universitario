export class CreateEstudianteDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  documento: string; // DNI, cédula, etc.
  fechaNacimiento: Date;
  direccion?: string;
  codigoEstudiante: string; // Código único del estudiante
  carreraId: number; // ID de la carrera en la que está inscrito
  activo: boolean;
}
