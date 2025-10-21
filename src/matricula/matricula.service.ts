import { Injectable } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';

@Injectable()
export class MatriculaService {
  private matriculas: (CreateMatriculaDto & { id: number })[] = [];
  private id = 1;

  create(createMatriculaDto: CreateMatriculaDto): (CreateMatriculaDto & { id: number }) {
    const matricula = { id: this.id++, ...createMatriculaDto };
    this.matriculas.push(matricula);
    return matricula;
  }

  findAll(): (CreateMatriculaDto & { id: number })[] {
    return this.matriculas;
  }

  findOne(id: number): (CreateMatriculaDto & { id: number }) | undefined {
    return this.matriculas.find(matricula => matricula.id === id);
  }

  update(id: number, updateMatriculaDto: UpdateMatriculaDto): (CreateMatriculaDto & { id: number }) | null {
    const index = this.matriculas.findIndex(matricula => matricula.id === id);
    if (index !== -1) {
      const updated = { ...this.matriculas[index], ...updateMatriculaDto } as (CreateMatriculaDto & { id: number });
      this.matriculas[index] = updated;
      return updated;
    }
    return null;
  }

  remove(id: number): (CreateMatriculaDto & { id: number }) | null {
    const index = this.matriculas.findIndex(matricula => matricula.id === id);
    if (index !== -1) {
      return this.matriculas.splice(index, 1)[0];
    }
    return null;
  }
}