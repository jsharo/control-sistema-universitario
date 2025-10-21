export class CreateEspecialidadDto {
  nombre: string; // Ej: "Ingeniería de Software", "Redes y Telecomunicaciones"
  codigo: string; // Código de la especialidad: "ISW", "RYT"
  descripcion?: string; // Descripción detallada (opcional)
  activa: boolean; // Si la especialidad está disponible
  carreraId: number; // ID de la carrera a la que pertenece
}
