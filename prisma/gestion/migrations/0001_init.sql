-- Gestion schema initial migration
-- Tables: usuario_carrera, usuario_materia (no FKs to other DBs; opaque IDs)

CREATE TABLE IF NOT EXISTS "usuario_carrera" (
  "id_usuario_carrera" SERIAL PRIMARY KEY,
  "usuarioId" INTEGER NOT NULL,
  "carreraId" INTEGER NOT NULL,
  "fecha_asignacion" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS "unique_usuario_carrera" ON "usuario_carrera"("usuarioId", "carreraId");

CREATE TABLE IF NOT EXISTS "usuario_materia" (
  "id_usuario_materia" SERIAL PRIMARY KEY,
  "usuarioId" INTEGER NOT NULL,
  "materiaId" INTEGER NOT NULL,
  "fecha_asignacion" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS "unique_usuario_materia" ON "usuario_materia"("usuarioId", "materiaId");
