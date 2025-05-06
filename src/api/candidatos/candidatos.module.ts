import { Module } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { CandidatosController } from './candidatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatoEntity } from './entities/candidato.entity';
import { PartidoEntity } from '../partidos/entities/partido.entity';
import { VotacionEntity } from '../votacion/entity/votacion.entity';
import { Socket } from 'src/shared/socket';

@Module({
  imports:[TypeOrmModule.forFeature([CandidatoEntity,PartidoEntity,VotacionEntity])],
  exports: [TypeOrmModule],
  providers: [CandidatosService,
    Socket
  ],
  controllers: [CandidatosController]

})
export class CandidatosModule {}
