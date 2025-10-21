import { Injectable } from '@nestjs/common';
import { CreateCicloDto } from './dto/create-ciclo.dto';
import { UpdateCicloDto } from './dto/update-ciclo.dto';

@Injectable()
export class CicloService {
  private ciclos: (CreateCicloDto & { id: number })[] = [];
  private id = 1;

  create(createCicloDto: CreateCicloDto): (CreateCicloDto & { id: number }) {
    const ciclo = { id: this.id++, ...createCicloDto };
    this.ciclos.push(ciclo);
    return ciclo;
  }

  findAll(): (CreateCicloDto & { id: number })[] {
    return this.ciclos;
  }

  findOne(id: number): (CreateCicloDto & { id: number }) | undefined {
    return this.ciclos.find(ciclo => ciclo.id === id);
  }

  update(id: number, updateCicloDto: UpdateCicloDto): (CreateCicloDto & { id: number }) | null {
    const index = this.ciclos.findIndex(ciclo => ciclo.id === id);
    if (index !== -1) {
      const updated = { ...this.ciclos[index], ...updateCicloDto } as (CreateCicloDto & { id: number });
      this.ciclos[index] = updated;
      return updated;
    }
    return null;
  }

  remove(id: number): (CreateCicloDto & { id: number }) | null {
    const index = this.ciclos.findIndex(ciclo => ciclo.id === id);
    if (index !== -1) {
      return this.ciclos.splice(index, 1)[0];
    }
    return null;
  }
}