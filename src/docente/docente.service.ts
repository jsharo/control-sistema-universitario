import { Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Injectable()
export class DocenteService {

  constructor(private readonly prisma: AcademicoPrismaService) {}

  async create(createDocenteDto: CreateDocenteDto) {
    return await this.prisma.docente.create({
      data: createDocenteDto
    });
  }

  async findAll() {
    return await this.prisma.docente.findMany({
      orderBy: {
        id_docente: 'asc'
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.docente.findUnique({
      where: { id_docente: id }
    });
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    await this.findOne(id);
    if (updateDocenteDto.codigo_docente) {
      const existente = await this.prisma.docente.findFirst({
        where: {
          codigo_docente: updateDocenteDto.codigo_docente,
          NOT: { id_docente: id }
        }
      });
      if (existente) {
        throw new Error('Ya existe un docente con ese código.');
      }
    }
    return await this.prisma.docente.update({
      where: { id_docente: id },
      data: updateDocenteDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.docente.delete({
      where: { id_docente: id }
    });
  }
}