import { Injectable } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Injectable()
export class EspecialidadService {
  private especialidades: (CreateEspecialidadDto & { id: number })[] = [];
  private id = 1;

  create(createEspecialidadDto: CreateEspecialidadDto): (CreateEspecialidadDto & { id: number }) {
    const especialidad = { id: this.id++, ...createEspecialidadDto };
    this.especialidades.push(especialidad);
    return especialidad;
  }

  findAll(): (CreateEspecialidadDto & { id: number })[] {
    return this.especialidades;
  }

  findOne(id: number): (CreateEspecialidadDto & { id: number }) | undefined {
    return this.especialidades.find(especialidad => especialidad.id === id);
  }

  update(id: number, updateEspecialidadDto: UpdateEspecialidadDto): (CreateEspecialidadDto & { id: number }) | null {
    const index = this.especialidades.findIndex(especialidad => especialidad.id === id);
    if (index !== -1) {
      const updated = { ...this.especialidades[index], ...updateEspecialidadDto } as (CreateEspecialidadDto & { id: number });
      this.especialidades[index] = updated;
      return updated;
    }
    return null;
  }

  remove(id: number): (CreateEspecialidadDto & { id: number }) | null {
    const index = this.especialidades.findIndex(especialidad => especialidad.id === id);
    if (index !== -1) {
      return this.especialidades.splice(index, 1)[0];
    }
    return null;
  }
}
