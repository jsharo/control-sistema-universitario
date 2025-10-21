import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudianteService {
  private estudiantes: (CreateEstudianteDto & { id: number })[] = [];
  private id = 1;

  create(createEstudianteDto: CreateEstudianteDto): (CreateEstudianteDto & { id: number }) {
    const estudiante = { id: this.id++, ...createEstudianteDto };
    this.estudiantes.push(estudiante);
    return estudiante;
  }

  findAll(): (CreateEstudianteDto & { id: number })[] {
    return this.estudiantes;
  }

  findOne(id: number): (CreateEstudianteDto & { id: number }) | undefined {
    return this.estudiantes.find(estudiante => estudiante.id === id);
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto): (CreateEstudianteDto & { id: number }) | null {
    const index = this.estudiantes.findIndex(estudiante => estudiante.id === id);
    if (index !== -1) {
      const updated = { ...this.estudiantes[index], ...updateEstudianteDto } as (CreateEstudianteDto & { id: number });
      this.estudiantes[index] = updated;
      return updated;
    }
    return null;
  }

  remove(id: number): (CreateEstudianteDto & { id: number }) | null {
    const index = this.estudiantes.findIndex(estudiante => estudiante.id === id);
    if (index !== -1) {
      return this.estudiantes.splice(index, 1)[0];
    }
    return null;
  }
}