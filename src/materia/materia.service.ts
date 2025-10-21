import { Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriaService {
  private materias: (CreateMateriaDto & { id: number })[] = [];
  private id = 1;

  create(createMateriaDto: CreateMateriaDto): (CreateMateriaDto & { id: number }) {
    const materia = { id: this.id++, ...createMateriaDto };
    this.materias.push(materia);
    return materia;
  }

  findAll(): (CreateMateriaDto & { id: number })[] {
    return this.materias;
  }

  findOne(id: number): (CreateMateriaDto & { id: number }) | undefined {
    return this.materias.find(materia => materia.id === id);
  }

  update(id: number, updateMateriaDto: UpdateMateriaDto): (CreateMateriaDto & { id: number }) | null {
    const index = this.materias.findIndex(materia => materia.id === id);
    if (index !== -1) {
      const updated = { ...this.materias[index], ...updateMateriaDto } as (CreateMateriaDto & { id: number });
      this.materias[index] = updated;
      return updated;
    }
    return null;
  }

  remove(id: number): (CreateMateriaDto & { id: number }) | null {
    const index = this.materias.findIndex(materia => materia.id === id);
    if (index !== -1) {
      return this.materias.splice(index, 1)[0];
    }
    return null;
  }
}