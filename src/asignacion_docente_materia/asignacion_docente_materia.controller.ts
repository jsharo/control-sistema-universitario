import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignacionDocenteMateriaService } from './asignacion_docente_materia.service';
import { CreateAsignacionDocenteMateriaDto } from './dto/create-asignacion_docente_materia.dto';
import { UpdateAsignacionDocenteMateriaDto } from './dto/update-asignacion_docente_materia.dto';

@Controller('asignacion-docente-materia')
export class AsignacionDocenteMateriaController {
  constructor(private readonly asignacionDocenteMateriaService: AsignacionDocenteMateriaService) {}

  @Post()
  create(@Body() createAsignacionDocenteMateriaDto: CreateAsignacionDocenteMateriaDto) {
    return this.asignacionDocenteMateriaService.create(createAsignacionDocenteMateriaDto);
  }

  @Get()
  findAll() {
    return this.asignacionDocenteMateriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.asignacionDocenteMateriaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAsignacionDocenteMateriaDto: UpdateAsignacionDocenteMateriaDto) {
    return this.asignacionDocenteMateriaService.update(+id, updateAsignacionDocenteMateriaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.asignacionDocenteMateriaService.remove(+id);
  }
}