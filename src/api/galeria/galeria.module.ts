import { Module } from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { GaleriaController } from './galeria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GaleriaEntity } from './entities/galeria.entity';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GaleriaEntity, CandidatoEntity])],
  providers: [GaleriaService],
  controllers: [GaleriaController]
})
export class GaleriaModule {}
