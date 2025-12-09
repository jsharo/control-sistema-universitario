import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { AcademicoPrismaService } from "src/prisma/academico.prisma.service";

@Injectable()
export class CarreraService {

  constructor(private readonly prisma: AcademicoPrismaService) {}

  async create(createCarreraDto: CreateCarreraDto) {
    return await this.prisma.carrera.create({
      data: createCarreraDto
    });
  }

  async findAll() {
    return await this.prisma.carrera.findMany({
      orderBy: {
        id_carrera: 'asc'
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.carrera.findUnique({
      where: { id_carrera: id }
    });
  }

  async update(id: number, updateCarreraDto: UpdateCarreraDto) {
    await this.findOne(id);
    if (updateCarreraDto.nombre) {
      const existente = await this.prisma.carrera.findFirst({
        where: {
          nombre: updateCarreraDto.nombre,
          NOT: { id_carrera: id }
        }
      });
      if (existente) {
        throw new Error('Ya existe una carrera con ese nombre.');
      }
    }
    return this.prisma.carrera.update({
      where: { id_carrera: id },
      data: updateCarreraDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.carrera.delete({
      where: { id_carrera: id }
    });
  }
}