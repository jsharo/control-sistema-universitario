import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CarreraService } from "./carrera.service";
import { CreateCarreraDto } from "./dto/create-carrera.dto";
import { UpdateCarreraDto } from "./dto/update-carrera.dto";

@Controller('carrera') 
export class CarreraController{
  constructor(private readonly carreraService: CarreraService){}

  @Post()
  create(@Body() CreateCarreraDto: CreateCarreraDto ){
    return this.carreraService.create(CreateCarreraDto);
  }

  @Get()
  finAll(){
    return this.carreraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){ 
    return this.carreraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarreraDto: UpdateCarreraDto){
    return this.carreraService.update(+id, updateCarreraDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string){
    return this.carreraService.remove(+id);
  }
}