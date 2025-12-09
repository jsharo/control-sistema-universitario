-- Auth schema initial migration
-- Tables: usuario, roles, permisos, roles_permisos

CREATE TABLE IF NOT EXISTS "usuario" (
  "id_usuario" SERIAL PRIMARY KEY,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "nombres" VARCHAR(100),
  "apellidos" VARCHAR(100),
  "telefono" VARCHAR(20),
  "role" VARCHAR(50) NOT NULL DEFAULT 'ESTUDIANTE',
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT NOW(),
  "activo" BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS "roles" (
  "id_rol" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(50) NOT NULL UNIQUE,
  "descripcion" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "permisos" (
  "id_permiso" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(50) NOT NULL UNIQUE,
  "descripcion" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "roles_permisos" (
  "id_rol_permiso" SERIAL PRIMARY KEY,
  "id_rol" INTEGER NOT NULL,
  "id_permiso" INTEGER NOT NULL,
  CONSTRAINT "roles_permisos_rol_fk" FOREIGN KEY ("id_rol") REFERENCES "roles"("id_rol") ON DELETE CASCADE,
  CONSTRAINT "roles_permisos_permiso_fk" FOREIGN KEY ("id_permiso") REFERENCES "permisos"("id_permiso") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "unique_rol_permiso" ON "roles_permisos"("id_rol", "id_permiso");
