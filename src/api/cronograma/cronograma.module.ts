import { Module } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CronogramaController } from './cronograma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramaEntity } from './entities/cronograma.entity';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CronogramaEntity, CandidatoEntity])],
  providers: [CronogramaService],
  controllers: [CronogramaController]
})
export class CronogramaModule {}
