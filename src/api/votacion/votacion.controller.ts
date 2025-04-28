import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVotacionDto } from './dto/createvotacion.dto';
import { VotacionService } from './votacion.service';

@Controller('votacion')
export class VotacionController {
    constructor(private readonly votacionesService: VotacionService) {}

    @Post()
    votar(@Body() dto: CreateVotacionDto) {
      return this.votacionesService.votar(dto);
    }
  

    @Get('resultados')
    resultados() {
      return this.votacionesService.resultadosPorPartido();
    }
}
