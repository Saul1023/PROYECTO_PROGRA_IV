import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { NewCronogramaDto } from './dto/newcronograma.dto';
import { EditCronogramaDto } from './dto/editcronograma.dto';

@Controller('cronograma')
export class CronogramaController {
    constructor(private cronogramaService: CronogramaService) {}

  @Get()
  findAll() {
    return this.cronogramaService.findAll();
  }

  @Post()
  add(@Body() dto: NewCronogramaDto) {
    return this.cronogramaService.add(dto);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() dto: EditCronogramaDto) {
    return this.cronogramaService.edit(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cronogramaService.delete(id);
  }
}
