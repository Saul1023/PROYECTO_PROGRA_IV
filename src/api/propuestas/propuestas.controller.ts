import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePropuestaDto } from './dto/create_propuesta.dto';
import { PropuestasService } from './propuestas.service';
import { UpdatePropuestaDto } from './dto/update_propuesta.dto';

@Controller('propuestas')
export class PropuestasController {
    constructor(private readonly propuestasService: PropuestasService) {}

  @Post()
  create(@Body() dto: CreatePropuestaDto) {
    return this.propuestasService.create(dto);
  }

  @Get()
  findAll() {
    return this.propuestasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propuestasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePropuestaDto) {
    return this.propuestasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propuestasService.remove(id);
  }
}
