import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CarreraModule } from './carrera/carrera.module';
import { CicloModule } from './ciclo/ciclo.module';
import { DocenteModule } from './docente/docente.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { MateriaModule } from './materia/materia.module';
import { MatriculaModule } from './matricula/matricula.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { AsignacionDocenteMateriaModule } from './asignacion_docente_materia/asignacion_docente_materia.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CarreraModule, CicloModule, DocenteModule, EstudianteModule, MateriaModule, MatriculaModule, EspecialidadModule, AsignacionDocenteMateriaModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
