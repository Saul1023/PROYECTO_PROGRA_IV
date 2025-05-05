import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PartidoEntity } from './entities/partido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MongoRepository, ObjectId, Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { NewPartidoDto } from './dto/new.dto';

@Injectable()
export class PartidosService {

    constructor(
        @InjectRepository(PartidoEntity)
        private readonly partidoRepository: Repository<PartidoEntity>,
      ) {}
    
      public async list(): Promise<PartidoEntity[]> {
        return await this.partidoRepository.find({order:{nombre:'ASC'}});
      }
      
      public async searchPaginate(page,limit,search:string='') {
        const skip = page*limit;
        console.log(Like(`%${search.trim()}%`));
        let where={};
        if(search !==''){
          where={ 
            '$or':[
            {nombre:  { $regex: search, $options: 'i' }},
            {lema: { $regex: search, $options: 'i' }},
            {foto: { $regex: search, $options: 'i' }},
          ]
          }
        }
    
        const [item,total] = 
        ( await this.partidoRepository
        .findAndCount(
          {
            where:where,
            skip,
            take:limit,
            relations:['candidatos'],
            order:{
              nombre:'ASC'
            }
          }
        ))
        console.log('info',item,total)
        return {item,total}
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
      public async activar(id){
        return await this.partidoRepository.update(id,{estado:1});
        //return await this.unidadRepository.delete(id);
      }
}
