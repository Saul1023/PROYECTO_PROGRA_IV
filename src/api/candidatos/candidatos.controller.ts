import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { NewDto } from './dto/new.dto';
import { EditDto } from './dto/edit.dto';

@Controller('candidatos')
export class CandidatosController {
    constructor(private candidatosService:CandidatosService){}

    @Get('')
    public index(){
        return this.candidatosService.list();
    }

    @Get('/search')
    public async searchPaginar(
      @Query('page') page: number = 0,
      @Query('limit') limit: number = 10,
      @Query('search') search: string = '',
    ) {
      try {
        console.log('Búsqueda de candidatos - Página:', page, 'Límite:', limit, 'Búsqueda:', search);
        const result = await this.candidatosService.searchPaginate(page, limit, search);
        console.log('Resultado de búsqueda:', result);
        return result;
      } catch (error) {
        console.error('Error en searchPaginar:', error);
        throw new InternalServerErrorException({
          message: 'Error al obtener candidatos',
          error: error.message,
        });
      }
    }

    @Post()
    public add(@Body() candidato:NewDto) {
        return this.candidatosService.add(candidato);
    }
    //para editar
    @Put('/activar/:id')
    async activar(@Param('id') id: string) {
      return await this.candidatosService.activar(id);
    }
    //para borrar
    @Delete(':id')
    async borrar(@Param('id') id: string) {
        return await this.candidatosService.delete(id);
    }

}
