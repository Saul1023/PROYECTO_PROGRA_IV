import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVotacionDto } from './dto/createvotacion.dto';
import { VotacionService } from './votacion.service';

@Controller('votacion')
export class VotacionController {
    constructor(private readonly votacionesService: VotacionService) {}
    @Post()
    votar(@Body() dto: CreateVotacionDto) {
      return this.votacionesService.votar(dto);
    }
    
    @Get('votos')
    async obtenerVotos(): Promise<any> {
      return await this.votacionesService.obtenerVotosPorCandidatos();
    }

// votacion.controller.ts
  @Get('verificar/:ci')
  async verificarVoto(@Param('ci') ci: string) {
    if (!ci || ci.length < 6) {
      throw new BadRequestException('CI inválido');
    }
    const yaVoto = await this.votacionesService.verificarSiYaVoto(ci);
    return { yaVoto };
  }

// votacion.controller.ts (backend)
@Get('candidatos')
async obtenerCandidatos() {
  const candidatos = await this.votacionesService.obtenerCandidatos();
  return Array.isArray(candidatos) ? candidatos : []; // Siempre devuelve array
}
}
