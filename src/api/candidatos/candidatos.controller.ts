import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    @Post('')
    public add(@Body() candidato:NewDto) {
        return this.candidatosService.add(candidato);
    }
    //para editar
    @Put(':id')
    public editar(@Param('id') id: string, @Body() candidato: EditDto) {
        return this.candidatosService.edit(id, candidato);
    }
    //para borrar
    @Delete(':id')
    public borrar(@Param() {id}){
        return this.candidatosService.delete(id);
    }

}
