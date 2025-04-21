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
    
      public async crearPartido(nombre: string, lema: string): Promise<PartidoEntity> {
        const nuevoPartido = this.partidoRepository.create({
          nombre,
          lema,
        });
        console.log('Creando nuevo partido:', nuevoPartido);
        return await this.partidoRepository.save(nuevoPartido);
      }
    
      public async add(partido: PartidoEntity): Promise<PartidoEntity> {
        return await this.partidoRepository.save(partido);
      }
    
      public async edit(id: number, partido: Partial<PartidoEntity>) {
        return await this.partidoRepository.update(id, partido);
      }
    
      public async delete(id: number) {
        return await this.partidoRepository.delete(id);
      }
}
