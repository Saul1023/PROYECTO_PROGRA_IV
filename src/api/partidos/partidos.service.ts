import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PartidoEntity } from './entities/partido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectId, Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { NewPartidoDto } from './dto/new.dto';

@Injectable()
export class PartidosService {

    constructor(
        @InjectRepository(PartidoEntity)
        private partidoRepository: Repository<PartidoEntity>,
      ) {}
    
      public list(): Promise<PartidoEntity[]> {
        return this.partidoRepository.find();
      }
    
      public async create(dto: NewPartidoDto): Promise<PartidoEntity> {
        const partido = this.partidoRepository.create(dto);
        return await this.partidoRepository.save(partido);
      }
      public async add(partido: PartidoEntity): Promise<PartidoEntity> {
        return await this.partidoRepository.save(partido);
      }
    
      public async edit(id: string, updateData: Partial<PartidoEntity>) {
        return await this.partidoRepository.update(id, updateData);
      }
      
      public async delete(id: string) {
        return await this.partidoRepository.delete(id);
      }
}
