import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { NewDto } from './dto/new.dto';
import { EditDto } from './dto/edit.dto';
import { ObjectId } from 'mongodb';

@Controller('candidatos')
export class CandidatosController {
    constructor(private candidatosService:CandidatosService){}

    @Get()
    public list() {
      return this.candidatosService.list();
    }
  
    @Get('/search')
    public async searchPaginar(
      @Query('page') page: number = 0,
      @Query('limit') limit: number = 10,
      @Query('search') search: string = '',
    ) {
      try {
        return await this.candidatosService.searchPaginate(page, limit, search);
      } catch (error) {
        throw new InternalServerErrorException({
          message: 'Error al obtener candidatos',
          error: error.message,
        });
      }
    }
  
    @Post()
    public add(@Body() candidato: NewDto) {
      return this.candidatosService.add(candidato);
    }
  
    @Put('/editar/:id')
    public async update(@Param('id') id: string, @Body() candidato: EditDto) {
      if (!ObjectId.isValid(id)) {
        throw new BadRequestException('ID inválido');
      }
      return await this.candidatosService.edit(id, candidato);
    }
  
    @Put('/activar/:id')
    public activar(@Param('id') id: string) {
      return this.candidatosService.activar(id);
    }
  
    @Delete(':id')
    public borrar(@Param('id') id: string) {
      return this.candidatosService.delete(id);
    }

    @Get('votos')
    async obtenerVotos() {
      const resultado = await this.candidatosService.obtenerVotosPorCandidato();
      return {
        success: true,
        message: 'Votos por candidato',
        data: resultado,
      };
    }
}
