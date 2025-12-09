import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Module({
  controllers: [MatriculaController],
  providers: [MatriculaService, AcademicoPrismaService],
})
export class MatriculaModule {}
