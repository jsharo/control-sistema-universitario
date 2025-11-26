import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstudianteService {

  constructor(private readonly prisma: PrismaService) {}

  create(createEstudianteDto: CreateEstudianteDto) {
    return this.prisma.estudiante.create({
      data: createEstudianteDto
    });
  }

  findAll() {
    return this.prisma.estudiante.findMany();
  }

  async findOne(id: number) {
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { id_estudiante: id }
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    await this.findOne(id);
    if (updateEstudianteDto.codigo_estudiante) {
      const existente = await this.prisma.estudiante.findFirst({
        where: {
          codigo_estudiante: updateEstudianteDto.codigo_estudiante,
          NOT: { id_estudiante: id }
        }
      });
      if (existente) {
        throw new Error('Ya existe un estudiante con ese código.');
      }
    }
    return this.prisma.estudiante.update({
      where: { id_estudiante: id },
      data: updateEstudianteDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.estudiante.delete({
      where: { id_estudiante: id }
    });
  }
}