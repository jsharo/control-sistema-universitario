import { Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Injectable()
export class DocenteService {
  private docentes: (CreateDocenteDto & { id: number })[] = [];
  private id = 1;

  create(createDocenteDto: CreateDocenteDto): (CreateDocenteDto & { id: number }) {
    const docente = { id: this.id++, ...createDocenteDto };
    this.docentes.push(docente);
    return docente;
  }

  findAll(): (CreateDocenteDto & { id: number })[] {
    return this.docentes;
  }

  findOne(id: number): (CreateDocenteDto & { id: number }) | undefined {
    return this.docentes.find(docente => docente.id === id);
  }

  update(id: number, updateDocenteDto: UpdateDocenteDto): (CreateDocenteDto & { id: number }) | null {
    const index = this.docentes.findIndex(docente => docente.id === id);
    if (index !== -1) {
      const updated = { ...this.docentes[index], ...updateDocenteDto } as (CreateDocenteDto & { id: number });
      this.docentes[index] = updated;
      return updated;
    }
    return null;
  }

  remove(id: number): (CreateDocenteDto & { id: number }) | null {
    const index = this.docentes.findIndex(docente => docente.id === id);
    if (index !== -1) {
      return this.docentes.splice(index, 1)[0];
    }
    return null;
  }
}