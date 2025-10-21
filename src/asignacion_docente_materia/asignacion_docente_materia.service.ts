import { Injectable } from '@nestjs/common';
import { CreateAsignacionDocenteMateriaDto } from './dto/create-asignacion_docente_materia.dto';
import { UpdateAsignacionDocenteMateriaDto } from './dto/update-asignacion_docente_materia.dto';

@Injectable()
export class AsignacionDocenteMateriaService {
  private asignaciones: (CreateAsignacionDocenteMateriaDto & { id: number })[] = [];
  private id = 1;

  create(createAsignacionDocenteMateriaDto: CreateAsignacionDocenteMateriaDto): (CreateAsignacionDocenteMateriaDto & { id: number }) {
    const asignacion = { id: this.id++, ...createAsignacionDocenteMateriaDto };
    this.asignaciones.push(asignacion);
    return asignacion;
  }

  findAll(): (CreateAsignacionDocenteMateriaDto & { id: number })[] {
    return this.asignaciones;
  }

  findOne(id: number): (CreateAsignacionDocenteMateriaDto & { id: number }) | undefined {
    return this.asignaciones.find(asignacion => asignacion.id === id);
  }

  update(id: number, updateAsignacionDocenteMateriaDto: UpdateAsignacionDocenteMateriaDto): (CreateAsignacionDocenteMateriaDto & { id: number }) | null {
    const index = this.asignaciones.findIndex(asignacion => asignacion.id === id);
    if (index !== -1) {
      const updated = { ...this.asignaciones[index], ...updateAsignacionDocenteMateriaDto } as (CreateAsignacionDocenteMateriaDto & { id: number });
      this.asignaciones[index] = updated;
      return updated;
    }
    return null;
  }

  remove(id: number): (CreateAsignacionDocenteMateriaDto & { id: number }) | null {
    const index = this.asignaciones.findIndex(asignacion => asignacion.id === id);
    if (index !== -1) {
      return this.asignaciones.splice(index, 1)[0];
    }
    return null;
  }
}