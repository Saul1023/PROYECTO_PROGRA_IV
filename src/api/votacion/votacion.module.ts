import { Module } from '@nestjs/common';
import { VotacionService } from './votacion.service';
import { VotacionController } from './votacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotacionEntity } from './entity/votacion.entity';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VotacionEntity, CandidatoEntity])],
  providers: [VotacionService],
  controllers: [VotacionController]
})
export class VotacionModule {}
