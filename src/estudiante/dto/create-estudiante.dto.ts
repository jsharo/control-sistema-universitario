export class CreateEstudianteDto {
  codigo_estudiante: string;
  nombres: string;
  apellidos: string;
  email?: string;
  telefono?: string;
  fecha_ingreso?: Date;
  id_carrera: number;
}
