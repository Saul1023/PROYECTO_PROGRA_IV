import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { NewPartidoDto } from './dto/new.dto';

@Controller('partidos')
export class PartidosController {
    constructor(private readonly partidosService: PartidosService) {}

    @Get()
    async list() {
      return await this.partidosService.list();
    }
  
    @Post()
    async create(@Body() createPartidoDto: NewPartidoDto) {
      return await this.partidosService.create(createPartidoDto);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updatePartidoDto: NewPartidoDto,
    ) {
      return await this.partidosService.edit(id, updatePartidoDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.partidosService.delete(id);
    }
}
