import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronogramaEntity } from './entities/cronograma.entity';
import { Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { NewCronogramaDto } from './dto/newcronograma.dto';
import { EditCronogramaDto } from './dto/editcronograma.dto';

@Injectable()
export class CronogramaService {
    constructor(
        @InjectRepository(CronogramaEntity)
        private cronogramaRepo: Repository<CronogramaEntity>,
    
        @InjectRepository(CandidatoEntity)
        private candidatoRepo: Repository<CandidatoEntity>,
      ) {}
    
      async findAll(): Promise<CronogramaEntity[]> {
        return await this.cronogramaRepo.find({ relations: ['candidato'] });
      }
    
      async add(dto: NewCronogramaDto): Promise<CronogramaEntity> {
        const candidato = await this.candidatoRepo.findOneBy({ _id: dto.candidatoId as any });
        if (!candidato) throw new NotFoundException('Candidato no encontrado');
    
        const nuevoEvento = this.cronogramaRepo.create({
          actividad: dto.actividad,
          fecha: dto.fecha,
          descripcion: dto.descripcion,
          candidato,
        });
    
        return await this.cronogramaRepo.save(nuevoEvento);
      }
    
      async edit(id: string, dto: EditCronogramaDto) {
        return await this.cronogramaRepo.update(id, dto);
      }
    
      async delete(id: string) {
        return await this.cronogramaRepo.delete(id);
      }
}
