import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatriculaService {

  constructor(private readonly prisma: PrismaService) {}

  create(createMatriculaDto: CreateMatriculaDto) {
    return this.prisma.matricula.create({
      data: createMatriculaDto
    });
  }

  findAll() {
    return this.prisma.matricula.findMany();
  }

  async findOne(id: number) {
    const matricula = await this.prisma.matricula.findUnique({
      where: { id_matricula: id }
    });
    if (!matricula) {
      throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
    }
    return matricula;
  }

  async update(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    await this.findOne(id);
    return this.prisma.matricula.update({
      where: { id_matricula: id },
      data: updateMatriculaDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.matricula.delete({
      where: { id_matricula: id }
    });
  }
}