import { Module } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadController } from './especialidad.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EspecialidadController],
  providers: [EspecialidadService, PrismaService],
})
export class EspecialidadModule {}
