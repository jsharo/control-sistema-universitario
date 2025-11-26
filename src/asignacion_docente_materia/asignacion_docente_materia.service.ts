import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsignacionDocenteMateriaDto } from './dto/create-asignacion_docente_materia.dto';
import { UpdateAsignacionDocenteMateriaDto } from './dto/update-asignacion_docente_materia.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AsignacionDocenteMateriaService {

  constructor(private readonly prisma: PrismaService) {}

  create(createAsignacionDocenteMateriaDto: CreateAsignacionDocenteMateriaDto) {
    return this.prisma.asignacionDocenteMateria.create({
      data: createAsignacionDocenteMateriaDto
    });
  }

  findAll() {
    return this.prisma.asignacionDocenteMateria.findMany();
  }

  async findOne(id: number) {
    const asignacion = await this.prisma.asignacionDocenteMateria.findUnique({
      where: { id_asignacion: id }
    });
    if (!asignacion) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }
    return asignacion;
  }

  async update(id: number, updateAsignacionDocenteMateriaDto: UpdateAsignacionDocenteMateriaDto) {
    await this.findOne(id); 
    return this.prisma.asignacionDocenteMateria.update({
      where: { id_asignacion: id },
      data: updateAsignacionDocenteMateriaDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.asignacionDocenteMateria.delete({
      where: { id_asignacion: id }
    });
  }
}