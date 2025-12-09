-- Generated via prisma migrate diff for Gestion schema
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "usuario_carrera" (
    "id_usuario_carrera" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "carreraId" INTEGER NOT NULL,
    "fecha_asignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_carrera_pkey" PRIMARY KEY ("id_usuario_carrera")
);

-- CreateTable
CREATE TABLE "usuario_materia" (
    "id_usuario_materia" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "fecha_asignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_materia_pkey" PRIMARY KEY ("id_usuario_materia")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_carrera_usuarioId_carreraId_key" ON "usuario_carrera"("usuarioId", "carreraId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_materia_usuarioId_materiaId_key" ON "usuario_materia"("usuarioId", "materiaId");
