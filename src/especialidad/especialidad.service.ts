import { Injectable } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Injectable()
export class EspecialidadService {

  constructor(private readonly prisma: AcademicoPrismaService) {}

  async create(createEspecialidadDto: CreateEspecialidadDto) {
    return await this.prisma.especialidad.create({
      data: createEspecialidadDto
    });
  }

  async findAll() {
    return await this.prisma.especialidad.findMany({
      include: {
        carrera: true
      },
      orderBy: {
        id_especialidad: 'asc'
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.especialidad.findUnique({
      where: { id_especialidad: id },
      include: {
        carrera: true
      }
    });
  }

  async update(id: number, updateEspecialidadDto: UpdateEspecialidadDto) {
    await this.findOne(id);
    if (updateEspecialidadDto.nombre) {
      const existente = await this.prisma.especialidad.findFirst({
        where: {
          nombre: updateEspecialidadDto.nombre,
          NOT: { id_especialidad: id }
        }
      });
      if (existente) {
        throw new Error('Ya existe una especialidad con ese nombre.');
      }
    }
    return await this.prisma.especialidad.update({
      where: { id_especialidad: id },
      data: updateEspecialidadDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.especialidad.delete({
      where: { id_especialidad: id }
    });
  }
}
