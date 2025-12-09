import { Module } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadController } from './especialidad.controller';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Module({
  controllers: [EspecialidadController],
  providers: [EspecialidadService, AcademicoPrismaService],
})
export class EspecialidadModule {}
