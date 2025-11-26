import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CarreraController],
  providers: [CarreraService, PrismaService],
})
export class CarreraModule {}