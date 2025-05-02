import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { NewCronogramaDto } from './dto/newcronograma.dto';
import { EditCronogramaDto } from './dto/editcronograma.dto';

@Controller('cronograma')
export class CronogramaController {
    constructor(private cronogramaService: CronogramaService) {}

  @Get('')
  public index() {
    return this.cronogramaService.list();
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
        return this.cronogramaService.searchPaginate(page,limit,search);
      }

  @Post()
  add(@Body() dto: NewCronogramaDto) {
    return this.cronogramaService.add(dto);
  }

  @Put(':id')
   async edit(@Param('id') id: string, @Body() dto: EditCronogramaDto) {
    return this.cronogramaService.edit(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cronogramaService.delete(id);
  }
}
