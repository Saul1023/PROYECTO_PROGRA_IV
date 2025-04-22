import { Module } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidoEntity } from './entities/partido.entity';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartidoEntity, CandidatoEntity]),
    PartidosModule,
],
  providers: [PartidosService],
  controllers: [PartidosController],
  exports: [PartidosService,TypeOrmModule]
})
export class PartidosModule {}
