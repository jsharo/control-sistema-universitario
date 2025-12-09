import { Injectable } from '@nestjs/common';
import { CreateCicloDto } from './dto/create-ciclo.dto';
import { UpdateCicloDto } from './dto/update-ciclo.dto';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Injectable()
export class CicloService {

  constructor(private readonly prisma: AcademicoPrismaService) {}

  async create(createCicloDto: CreateCicloDto) {
    return await this.prisma.ciclo.create({
      data: createCicloDto
    });
  }

  async findAll() {
    return await this.prisma.ciclo.findMany({
      orderBy: {
        id_ciclo: 'asc'
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.ciclo.findUnique({
      where: { id_ciclo: id }
    });
  }

  async update(id: number, updateCicloDto: UpdateCicloDto) {
    await this.findOne(id);
    if (updateCicloDto.nombre) {
      const existente = await this.prisma.ciclo.findFirst({
        where: {
          nombre: updateCicloDto.nombre,
          NOT: { id_ciclo: id }
        }
      });
      if (existente) {
        throw new Error('Ya existe un ciclo con ese nombre.');
      }
    }
    return await this.prisma.ciclo.update({
      where: { id_ciclo: id },
      data: updateCicloDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.ciclo.delete({
      where: { id_ciclo: id }
    });
  }
}