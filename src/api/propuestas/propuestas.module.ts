import { Module } from '@nestjs/common';
import { PropuestasService } from './propuestas.service';
import { PropuestasController } from './propuestas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './entities/propuesta.entity';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropuestaEntity, CandidatoEntity])],
  providers: [PropuestasService],
  controllers: [PropuestasController]
})
export class PropuestasModule {}
