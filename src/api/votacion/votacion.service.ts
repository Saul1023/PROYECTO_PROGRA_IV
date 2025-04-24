import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VotacionEntity } from './entity/votacion.entity';
import { Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { CreateVotacionDto } from './dto/createvotacion.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class VotacionService {
    constructor(
        @InjectRepository(VotacionEntity)
        private votacionRepository: Repository<VotacionEntity>,
        @InjectRepository(CandidatoEntity)
        private candidatoRepository: Repository<CandidatoEntity>,
      ) {}
    
      async votar(dto: CreateVotacionDto): Promise<VotacionEntity> {
        const candidato = await this.candidatoRepository.findOne({
            where: { _id: new ObjectId(dto.candidatoId) },
        });
    
        if (!candidato) {
            throw new NotFoundException('Candidato no encontrado');
        }
        const votoExistente = await this.votacionRepository.findOne({
            where: {
                usuarioId: dto.usuarioId,
                "candidato._id": { $eq: new ObjectId(dto.candidatoId) }
            } as any,
        });
    
        if (votoExistente) {
            throw new BadRequestException('Ya votaste por este candidato.');
        }
        const nuevoVoto = this.votacionRepository.create({
            usuarioId: dto.usuarioId,
            candidato,
            fechaVoto: new Date(),
            cantidadVotos: 1, 
        });
    
        const existingVotes = await this.votacionRepository.find({
            where: { "candidato._id": { $eq: new ObjectId(dto.candidatoId) } } as any,
        });
        nuevoVoto.cantidadVotos += existingVotes.length;
    
        return this.votacionRepository.save(nuevoVoto);
    }
    
      async resultados() {
        const votos = await this.votacionRepository.find({ relations: ['candidato'] });
    
        const conteo = new Map<string, { candidato: CandidatoEntity, votos: number }>();
    
        for (const voto of votos) {
          const id = voto.candidato._id.toString();
          if (!conteo.has(id)) {
            conteo.set(id, { candidato: voto.candidato, votos: 1 });
          } else {
            conteo.get(id).votos += 1;
          }
        }
    
        return Array.from(conteo.values());
      }
}
