import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from './entities/propuesta.entity';
import { Like, Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { CreatePropuestaDto } from './dto/create_propuesta.dto';
import { ObjectId } from 'mongodb';
import { UpdatePropuestaDto } from './dto/update_propuesta.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PropuestasService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private propuestaRepository: Repository<PropuestaEntity>,
    
        @InjectRepository(CandidatoEntity)
        private candidatoRepository: Repository<CandidatoEntity>,
      ) {}
    
      
      public async list(): Promise<PropuestaEntity[]> {
          return await this.propuestaRepository.find({order:{titulo:'ASC'}});
        }    


async searchPaginate(page: number, limit: number, search: string) {
        const skip = page * limit;
      
        const where = search
          ? { titulo: Like(`%${search}%`) }
          : {};
      
        const [result, total] = await this.propuestaRepository.findAndCount({
          where,
          skip,
          take: limit,
          relations: ['candidatos'],
        });

        const data = plainToClass(PropuestaEntity, result);
      
        return {
          data: data,
          total,
          page,
          limit,
        };
      }

        async add(dto: CreatePropuestaDto): Promise<PropuestaEntity> {
          let candidato: CandidatoEntity | null = null;
        
          if (dto.candidatoId) {
            candidato = await this.candidatoRepository.findOneBy({ _id: new ObjectId(dto.candidatoId) });
            if (!candidato) throw new NotFoundException('Candidato no encontrado');
          }
        
          const nuevoEvento = this.propuestaRepository.create({
            titulo: dto.titulo,
            descripcion: dto.descripcion,
            candidato: candidato || undefined,  // puede omitirse si null
          });
        
          return await this.propuestaRepository.save(nuevoEvento);
        }

      /*
      async add(dto: CreatePropuestaDto): Promise<PropuestaEntity> {
        let candidato: CandidatoEntity | null = null;
      
        if (dto.candidatoId) {
          candidato = await this.propuestaRepository.findOneBy({ _id: new ObjectId(dto.candidatoId) });
          if (!candidato) throw new NotFoundException('Candidato no encontrado');
        }
      
        const nuevoEvento = this.cronogramaRepo.create({
          actividad: dto.actividad,
          fecha: dto.fecha,
          descripcion: dto.descripcion,
          candidato: candidato || undefined,  // puede omitirse si null
        });
      
        return await this.cronogramaRepo.save(nuevoEvento);
      }
    
      findAll() {
        return this.propuestaRepository.find({ relations: ['candidato'] });
      }*/
    
      findOne(id: string) {
        return this.propuestaRepository.findOne({
          where: { _id: new ObjectId(id) },
          relations: ['candidato'],
        });
      }
    
      async update(id: string, dto: UpdatePropuestaDto) {
        const propuesta = await this.propuestaRepository.findOneBy({
          _id: new ObjectId(id),
        });
    
        if (!propuesta) {
          throw new NotFoundException('Propuesta no encontrada');
        }
    
        Object.assign(propuesta, dto);
        return this.propuestaRepository.save(propuesta);
      }
    
      async remove(id: string) {
        const result = await this.propuestaRepository.delete(new ObjectId(id));
        if (result.affected === 0) {
          throw new NotFoundException('Propuesta no encontrada');
        }
        return { message: 'Propuesta eliminada' };
      }

      public async activar(id){
        return await this.propuestaRepository.update(id,{estado:1});
        //return await this.unidadRepository.delete(id);
      }
}
