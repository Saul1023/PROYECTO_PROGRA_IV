import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from './entities/propuesta.entity';
import { Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { CreatePropuestaDto } from './dto/create_propuesta.dto';
import { ObjectId } from 'mongodb';
import { UpdatePropuestaDto } from './dto/update_propuesta.dto';

@Injectable()
export class PropuestasService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private propuestaRepository: Repository<PropuestaEntity>,
    
        @InjectRepository(CandidatoEntity)
        private candidatoRepository: Repository<CandidatoEntity>,
      ) {}
    
      async create(dto: CreatePropuestaDto) {
        const candidato = await this.candidatoRepository.findOneBy({
          _id: new ObjectId(dto.candidatoId),
        });
    
        if (!candidato) {
          throw new NotFoundException('Candidato no encontrado');
        }
    
        const propuesta = this.propuestaRepository.create({
          titulo: dto.titulo,
          descripcion: dto.descripcion,
          candidato,
        });
    
        return this.propuestaRepository.save(propuesta);
      }
    
      findAll() {
        return this.propuestaRepository.find({ relations: ['candidato'] });
      }
    
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
}
