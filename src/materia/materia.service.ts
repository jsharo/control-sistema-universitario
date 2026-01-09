import { Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { AcademicoPrismaService } from 'src/prisma/academico.prisma.service';

@Injectable()
export class MateriaService {
  constructor(private readonly prisma: AcademicoPrismaService) {}

  async create(createMateriaDto: CreateMateriaDto) {
    return await this.prisma.materia.create({
      data: createMateriaDto
    });
  }

  async findAll() {
    return await this.prisma.materia.findMany({
      include: {
        especialidad: {
          include: {
            carrera: true
          }
        },
        ciclo: true
      },
      orderBy: {
        id_materia: 'asc'
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.materia.findUnique({
      where: { id_materia: id },
      include: {
        especialidad: {
          include: {
            carrera: true
          }
        },
        ciclo: true
      }
    });
  }

  async update(id: number, updateMateriaDto: UpdateMateriaDto) {
    await this.findOne(id);
    
    if (updateMateriaDto.codigo) {
      const existente = await this.prisma.materia.findFirst({
        where: {
          codigo: updateMateriaDto.codigo,
          NOT: { id_materia: id }
        }
      });
      if (existente) {
        throw new Error('Ya existe una materia con ese código.');
      }
    }
    
    return await this.prisma.materia.update({
      where: { id_materia: id },
      data: updateMateriaDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.materia.delete({
      where: { id_materia: id }
    });
  }
}