-- CreateEnum
CREATE TYPE "EstadoGeneral" AS ENUM ('activo', 'inactivo');

-- CreateEnum
CREATE TYPE "EstadoEstudiante" AS ENUM ('activo', 'inactivo', 'graduado', 'retirado');

-- CreateEnum
CREATE TYPE "EstadoMatricula" AS ENUM ('cursando', 'aprobado', 'reprobado', 'retirado');

-- CreateTable
CREATE TABLE "carrera" (
    "id_carrera" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "duracion_semestres" INTEGER,
    "estado" "EstadoGeneral" NOT NULL DEFAULT 'activo',

    CONSTRAINT "carrera_pkey" PRIMARY KEY ("id_carrera")
);

-- CreateTable
CREATE TABLE "especialidad" (
    "id_especialidad" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "id_carrera" INTEGER NOT NULL,

    CONSTRAINT "especialidad_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateTable
CREATE TABLE "ciclo" (
    "id_ciclo" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoGeneral" NOT NULL DEFAULT 'activo',

    CONSTRAINT "ciclo_pkey" PRIMARY KEY ("id_ciclo")
);

-- CreateTable
CREATE TABLE "materia" (
    "id_materia" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "creditos" INTEGER NOT NULL,
    "horas_semanales" INTEGER,
    "id_especialidad" INTEGER NOT NULL,
    "id_ciclo" INTEGER NOT NULL,

    CONSTRAINT "materia_pkey" PRIMARY KEY ("id_materia")
);

-- CreateTable
CREATE TABLE "docente" (
    "id_docente" SERIAL NOT NULL,
    "codigo_docente" VARCHAR(20) NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150),
    "telefono" VARCHAR(15),
    "especialidad" VARCHAR(100),
    "estado" "EstadoGeneral" NOT NULL DEFAULT 'activo',

    CONSTRAINT "docente_pkey" PRIMARY KEY ("id_docente")
);

-- CreateTable
CREATE TABLE "estudiante" (
    "id_estudiante" SERIAL NOT NULL,
    "codigo_estudiante" VARCHAR(20) NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150),
    "telefono" VARCHAR(15),
    "fecha_ingreso" TIMESTAMP(3),
    "id_carrera" INTEGER NOT NULL,
    "estado" "EstadoEstudiante" NOT NULL DEFAULT 'activo',

    CONSTRAINT "estudiante_pkey" PRIMARY KEY ("id_estudiante")
);

-- CreateTable
CREATE TABLE "asignacion_docente_materia" (
    "id_asignacion" SERIAL NOT NULL,
    "id_docente" INTEGER NOT NULL,
    "id_materia" INTEGER NOT NULL,
    "grupo" VARCHAR(10),
    "horario" TEXT,
    "fecha_asignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asignacion_docente_materia_pkey" PRIMARY KEY ("id_asignacion")
);

-- CreateTable
CREATE TABLE "matricula" (
    "id_matricula" SERIAL NOT NULL,
    "id_estudiante" INTEGER NOT NULL,
    "id_materia" INTEGER NOT NULL,
    "fecha_matricula" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calificacion" DOUBLE PRECISION,
    "estado" "EstadoMatricula" NOT NULL DEFAULT 'cursando',

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("id_matricula")
);

-- CreateIndex
CREATE UNIQUE INDEX "carrera_nombre_key" ON "carrera"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "materia_codigo_key" ON "materia"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "docente_codigo_docente_key" ON "docente"("codigo_docente");

-- CreateIndex
CREATE UNIQUE INDEX "docente_email_key" ON "docente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "estudiante_codigo_estudiante_key" ON "estudiante"("codigo_estudiante");

-- CreateIndex
CREATE UNIQUE INDEX "estudiante_email_key" ON "estudiante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "asignacion_docente_materia_id_docente_id_materia_grupo_key" ON "asignacion_docente_materia"("id_docente", "id_materia", "grupo");

-- CreateIndex
CREATE UNIQUE INDEX "matricula_id_estudiante_id_materia_key" ON "matricula"("id_estudiante", "id_materia");

-- AddForeignKey
ALTER TABLE "especialidad" ADD CONSTRAINT "especialidad_id_carrera_fkey" FOREIGN KEY ("id_carrera") REFERENCES "carrera"("id_carrera") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materia" ADD CONSTRAINT "materia_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "especialidad"("id_especialidad") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materia" ADD CONSTRAINT "materia_id_ciclo_fkey" FOREIGN KEY ("id_ciclo") REFERENCES "ciclo"("id_ciclo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_id_carrera_fkey" FOREIGN KEY ("id_carrera") REFERENCES "carrera"("id_carrera") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_docente_materia" ADD CONSTRAINT "asignacion_docente_materia_id_docente_fkey" FOREIGN KEY ("id_docente") REFERENCES "docente"("id_docente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_docente_materia" ADD CONSTRAINT "asignacion_docente_materia_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materia"("id_materia") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_estudiante_fkey" FOREIGN KEY ("id_estudiante") REFERENCES "estudiante"("id_estudiante") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materia"("id_materia") ON DELETE CASCADE ON UPDATE CASCADE;
