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
        const presidenteId = new ObjectId(dto.presidenteId);
        const vicepresidenteId = new ObjectId(dto.vicepresidenteId);
        const usuarioId = dto.usuarioId; // <<< No uses ObjectId aquí
      
        // Verificar si el usuario ya ha votado
        const votoExistente = await this.votacionRepository.findOne({
          where: { usuarioId: usuarioId }, // <<< Bien escrito
        });
      
        if (votoExistente) {
          throw new BadRequestException('El usuario ya ha votado.');
        }
      
        // Verificar si el presidente existe
        const presidente = await this.candidatoRepository.findOne({
          where: { _id: presidenteId },
        });
      
        if (!presidente) {
          throw new NotFoundException('Presidente no encontrado');
        }
      
        // Verificar si el vicepresidente existe
        const vicepresidente = await this.candidatoRepository.findOne({
          where: { _id: vicepresidenteId },
        });
      
        if (!vicepresidente) {
          throw new NotFoundException('Vicepresidente no encontrado');
        }
      
        const fechaVoto = new Date(dto.fechaVoto);
      
        if (isNaN(fechaVoto.getTime())) {
          throw new BadRequestException('fechaVoto no es una fecha válida');
        }
      
        const nuevoVoto = this.votacionRepository.create({
          presidente,
          vicepresidente,
          fechaVoto,
          usuarioId, // <<< Ya normal como string
        });
      
        return this.votacionRepository.save(nuevoVoto);
      }

    // Resultados por candidato
    async resultadosPorCandidato() {
        const votos = await this.votacionRepository.find({
            relations: ['presidente', 'vicepresidente']
        });

        // Contar votos por candidato
        const conteoCandidatos = new Map<string, {
            candidato: CandidatoEntity,
            votos: number
        }>();

        for (const voto of votos) {
            // Contar votos del presidente
            const presidenteId = voto.presidente._id.toString();
            conteoCandidatos.set(presidenteId, {
                candidato: voto.presidente,
                votos: (conteoCandidatos.get(presidenteId)?.votos || 0) + 1,
            });

            // Contar votos del vicepresidente
            const vicepresidenteId = voto.vicepresidente._id.toString();
            conteoCandidatos.set(vicepresidenteId, {
                candidato: voto.vicepresidente,
                votos: (conteoCandidatos.get(vicepresidenteId)?.votos || 0) + 1,
            });
        }

        return Array.from(conteoCandidatos.values());
    }

    // Resultados por partido
    async resultadosPorPartido() {
        const votos = await this.votacionRepository.find({
            relations: ['presidente', 'presidente.partido', 'vicepresidente', 'vicepresidente.partido']
        });

        // Contar votos por partido
        const conteoPartidos = new Map<string, {
            partido: string, // o el tipo de tu entidad Partido
            votos: number,
            candidatos: { nombre: string, votos: number }[]
        }>();

        for (const voto of votos) {
            // Presidente
            const presidentePartidoId = voto.presidente.partido._id.toString();
            const presidentePartidoNombre = voto.presidente.partido.nombre;

            if (!conteoPartidos.has(presidentePartidoId)) {
                conteoPartidos.set(presidentePartidoId, {
                    partido: presidentePartidoNombre,
                    votos: 1,
                    candidatos: [{ nombre: voto.presidente.nombre, votos: 1 }],
                });
            } else {
                const partidoData = conteoPartidos.get(presidentePartidoId);
                partidoData.votos += 1;

                const candidatoExistente = partidoData.candidatos.find(c => c.nombre === voto.presidente.nombre);
                if (candidatoExistente) {
                    candidatoExistente.votos += 1;
                } else {
                    partidoData.candidatos.push({ nombre: voto.presidente.nombre, votos: 1 });
                }
            }

            // Vicepresidente
            const vicepresidentePartidoId = voto.vicepresidente.partido._id.toString();
            const vicepresidentePartidoNombre = voto.vicepresidente.partido.nombre;

            if (!conteoPartidos.has(vicepresidentePartidoId)) {
                conteoPartidos.set(vicepresidentePartidoId, {
                    partido: vicepresidentePartidoNombre,
                    votos: 1,
                    candidatos: [{ nombre: voto.vicepresidente.nombre, votos: 1 }],
                });
            } else {
                const partidoData = conteoPartidos.get(vicepresidentePartidoId);
                partidoData.votos += 1;

                const candidatoExistente = partidoData.candidatos.find(c => c.nombre === voto.vicepresidente.nombre);
                if (candidatoExistente) {
                    candidatoExistente.votos += 1;
                } else {
                    partidoData.candidatos.push({ nombre: voto.vicepresidente.nombre, votos: 1 });
                }
            }
        }

        return Array.from(conteoPartidos.values());
    }
}
