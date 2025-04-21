import { Module } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidoEntity } from './entities/partido.entity';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartidoEntity, CandidatoEntity])
],
  providers: [PartidosService],
  controllers: [PartidosController],
  exports: [PartidosService]
})
export class PartidosModule {}
