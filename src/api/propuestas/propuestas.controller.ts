import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePropuestaDto } from './dto/create_propuesta.dto';
import { PropuestasService } from './propuestas.service';
import { UpdatePropuestaDto } from './dto/update_propuesta.dto';

@Controller('propuestas')
export class PropuestasController {
    constructor(private readonly propuestasService: PropuestasService) {}


  @Post()
  add(@Body() dto: CreatePropuestaDto) {
    return this.propuestasService.add(dto);
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
          return this.propuestasService.searchPaginate(page,limit,search);
        }
  @Get('')
  public index() {
    return this.propuestasService.list();
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
