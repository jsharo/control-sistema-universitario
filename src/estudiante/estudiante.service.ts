import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Injectable()
export class EstudianteService {

  constructor(private readonly prisma: AcademicoPrismaService) {}

  create(createEstudianteDto: CreateEstudianteDto) {
    if (!this.prisma.academico) throw new Error('BD Académico no disponible')
      return this.prisma.estudiante.create({
      data: createEstudianteDto
    });
  }

  findAll() {
    if (!this.prisma.academico) throw new Error('BD Académico no disponible')
      return this.prisma.estudiante.findMany();
  }

  async findOne(id: number) {
    if (!this.prisma.academico) throw new Error('BD Académico no disponible')
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
      if (!this.prisma.academico) throw new Error('BD Académico no disponible')
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
    if (!this.prisma.academico) throw new Error('BD Académico no disponible')
      return this.prisma.estudiante.update({
      where: { id_estudiante: id },
      data: updateEstudianteDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    if (!this.prisma.academico) throw new Error('BD Académico no disponible')
      return this.prisma.estudiante.delete({
      where: { id_estudiante: id }
    });
  }
}