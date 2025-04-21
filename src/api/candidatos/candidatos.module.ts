import { Module } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { CandidatosController } from './candidatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatoEntity } from './entities/candidato.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CandidatoEntity])],
  exports: [TypeOrmModule],
  providers: [CandidatosService],
  controllers: [CandidatosController]

})
export class CandidatosModule {}
