import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidatoEntity } from './entities/candidato.entity';
import { ObjectId, Repository } from 'typeorm';
import { PartidoEntity } from '../partidos/entities/partido.entity';
import { NewDto } from './dto/new.dto';
import { EditDto } from './dto/edit.dto';

@Injectable()
export class CandidatosService {
    constructor(
        @InjectRepository(CandidatoEntity)
        private candidatoRepository: Repository<CandidatoEntity>,
        @InjectRepository(PartidoEntity)
        private partidoRepository: Repository<PartidoEntity>,
      ) {}
    
      public list(): Promise<CandidatoEntity[]> {
        return this.candidatoRepository.find({ relations: ['partido'] });
      }
    
      public async add(dto: NewDto): Promise<CandidatoEntity> {
        const partido = await this.partidoRepository.findOne({
          where: { _id: new ObjectId(dto.partidoId) },
        });
    
        if (!partido) {
          throw new NotFoundException('Partido no encontrado');
        }
    
        const nuevoCandidato = this.candidatoRepository.create({
          nombre: dto.nombre,
          apellido: dto.apellido,
          fechaNacimiento: new Date(dto.fechaNacimiento),
          biografia: dto.biografia,
          puesto: dto.puesto,
          activo: dto.activo ?? true,
          partido: partido,
        });
    
        return await this.candidatoRepository.save(nuevoCandidato);
      }

      public async edit(id: string, candidato: EditDto) {
        const updateData: any = { ...candidato };
    
        if (candidato.partidoId) {
          const partido = await this.partidoRepository.findOne({
            where: { _id: new ObjectId(candidato.partidoId) },
          });
          if (!partido) {
            throw new NotFoundException('Partido no encontrado');
          }
          updateData.partido = partido;
        }
    
        return await this.candidatoRepository.update(
          { _id: new ObjectId(id) },
          updateData,
        );
      }

      public async delete(id: string) {
        return await this.candidatoRepository.delete({ _id: new ObjectId(id) });
      }
}
