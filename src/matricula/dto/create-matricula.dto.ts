export class CreateMatriculaDto {
    id_matricula: number;
    id_estudiante: number;
    id_materia: number;
    fecha_matricula: Date;
    calificacion: number;
    estado: string;
}
