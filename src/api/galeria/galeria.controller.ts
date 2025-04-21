import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { NewGaleriaDto } from './dto/newgaleria.dto';
import { EditGaleriaDto } from './dto/editgaleria.dto';

@Controller('galeria')
export class GaleriaController {
    constructor(private galeriaService: GaleriaService) {}

    @Get()
    findAll() {
      return this.galeriaService.findAll();
    }
  
    @Post()
    add(@Body() dto: NewGaleriaDto) {
      return this.galeriaService.add(dto);
    }
  
    @Put(':id')
    edit(@Param('id') id: string, @Body() dto: EditGaleriaDto) {
      return this.galeriaService.edit(id, dto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.galeriaService.delete(id);
    }
}
