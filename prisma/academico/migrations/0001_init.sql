-- Academico schema initial migration
-- Tables: carrera, especialidad, ciclo, materia, docente, estudiante, asignacion_docente_materia, matricula

CREATE TABLE IF NOT EXISTS "carrera" (
  "id_carrera" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(100) NOT NULL UNIQUE,
  "descripcion" TEXT,
  "duracion_semestres" INTEGER,
  "estado" VARCHAR(20) NOT NULL DEFAULT 'activo'
);

CREATE TABLE IF NOT EXISTS "especialidad" (
  "id_especialidad" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(100) NOT NULL,
  "id_carrera" INTEGER NOT NULL,
  CONSTRAINT "especialidad_carrera_fk" FOREIGN KEY ("id_carrera") REFERENCES "carrera"("id_carrera") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ciclo" (
  "id_ciclo" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(50) NOT NULL,
  "fecha_inicio" TIMESTAMP NOT NULL,
  "fecha_fin" TIMESTAMP NOT NULL,
  "estado" TEXT NOT NULL DEFAULT 'activo'
);

CREATE TABLE IF NOT EXISTS "materia" (
  "id_materia" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(150) NOT NULL,
  "codigo" VARCHAR(20) NOT NULL UNIQUE,
  "creditos" INTEGER NOT NULL,
  "horas_semanales" INTEGER,
  "id_especialidad" INTEGER NOT NULL,
  "id_ciclo" INTEGER NOT NULL,
  CONSTRAINT "materia_especialidad_fk" FOREIGN KEY ("id_especialidad") REFERENCES "especialidad"("id_especialidad") ON DELETE CASCADE,
  CONSTRAINT "materia_ciclo_fk" FOREIGN KEY ("id_ciclo") REFERENCES "ciclo"("id_ciclo") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "docente" (
  "id_docente" SERIAL PRIMARY KEY,
  "codigo_docente" VARCHAR(20) NOT NULL UNIQUE,
  "nombres" VARCHAR(100) NOT NULL,
  "apellidos" VARCHAR(100) NOT NULL,
  "email" VARCHAR(150),
  "telefono" VARCHAR(15),
  "especialidad" VARCHAR(100),
  "estado" VARCHAR(20) NOT NULL DEFAULT 'activo'
);

CREATE UNIQUE INDEX IF NOT EXISTS "docente_email_unique" ON "docente"("email") WHERE "email" IS NOT NULL;

CREATE TABLE IF NOT EXISTS "estudiante" (
  "id_estudiante" SERIAL PRIMARY KEY,
  "codigo_estudiante" VARCHAR(20) NOT NULL UNIQUE,
  "nombres" VARCHAR(100) NOT NULL,
  "apellidos" VARCHAR(100) NOT NULL,
  "email" VARCHAR(150),
  "telefono" VARCHAR(15),
  "fecha_ingreso" TIMESTAMP,
  "id_carrera" INTEGER NOT NULL,
  "estado" VARCHAR(20) NOT NULL DEFAULT 'activo',
  CONSTRAINT "estudiante_carrera_fk" FOREIGN KEY ("id_carrera") REFERENCES "carrera"("id_carrera") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "estudiante_email_unique" ON "estudiante"("email") WHERE "email" IS NOT NULL;

CREATE TABLE IF NOT EXISTS "asignacion_docente_materia" (
  "id_asignacion" SERIAL PRIMARY KEY,
  "id_docente" INTEGER NOT NULL,
  "id_materia" INTEGER NOT NULL,
  "grupo" VARCHAR(10),
  "horario" TEXT,
  "fecha_asignacion" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT "asignacion_docente_fk" FOREIGN KEY ("id_docente") REFERENCES "docente"("id_docente") ON DELETE CASCADE,
  CONSTRAINT "asignacion_materia_fk" FOREIGN KEY ("id_materia") REFERENCES "materia"("id_materia") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "unique_docente_materia_grupo" ON "asignacion_docente_materia"("id_docente", "id_materia", "grupo");

CREATE TABLE IF NOT EXISTS "matricula" (
  "id_matricula" SERIAL PRIMARY KEY,
  "id_estudiante" INTEGER NOT NULL,
  "id_materia" INTEGER NOT NULL,
  "fecha_matricula" TIMESTAMP NOT NULL DEFAULT NOW(),
  "calificacion" DOUBLE PRECISION,
  "estado" VARCHAR(20) NOT NULL DEFAULT 'cursando',
  CONSTRAINT "matricula_estudiante_fk" FOREIGN KEY ("id_estudiante") REFERENCES "estudiante"("id_estudiante") ON DELETE CASCADE,
  CONSTRAINT "matricula_materia_fk" FOREIGN KEY ("id_materia") REFERENCES "materia"("id_materia") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "unique_estudiante_materia" ON "matricula"("id_estudiante", "id_materia");
