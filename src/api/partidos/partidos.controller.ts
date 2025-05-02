import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { NewPartidoDto } from './dto/new.dto';

@Controller('partidos')
export class PartidosController {
    constructor(private readonly partidosService: PartidosService) {}

    @Get('')
    public index() {
      return this.partidosService.list();
    }
    
    @Get('/search')
    public searchPaginar(
      @Query('page') page:number,
      @Query('limit') limit:number,
      @Query('search') search:string,
    ){
      page = page===undefined?0:page;
      limit = limit===undefined?10:limit;
      console.log("datos",page,limit,search);
      return this.partidosService.searchPaginate(page,limit,search);
    }

    @Post()
    public create(@Body() createPartidoDto: NewPartidoDto) {
      return this.partidosService.create(createPartidoDto);
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
