import { Module } from '@nestjs/common';
import { VotacionService } from './votacion.service';
import { VotacionController } from './votacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotacionEntity } from './entity/votacion.entity';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([VotacionEntity, CandidatoEntity]),
  UsersModule,
  HttpModule
],
  providers: [VotacionService],
  controllers: [VotacionController],
  exports: [VotacionService]
})
export class VotacionModule {}
