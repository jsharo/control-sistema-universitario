import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Module({
  controllers: [CarreraController],
  providers: [CarreraService, AcademicoPrismaService],
})
export class CarreraModule {}