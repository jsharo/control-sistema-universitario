import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Module({
  controllers: [EstudianteController],
  providers: [EstudianteService, AcademicoPrismaService],
})
export class EstudianteModule {}
