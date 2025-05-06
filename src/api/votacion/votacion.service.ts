import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VotacionEntity } from './entity/votacion.entity';
import { Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { CreateVotacionDto } from './dto/createvotacion.dto';
import { ObjectId } from 'mongodb';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class VotacionService {
    private apiUrl: string = 'http://localhost:3000'; // Replace with your actual API URL

    constructor(
        @InjectRepository(VotacionEntity)
        private votacionRepository: Repository<VotacionEntity>,
        @InjectRepository(CandidatoEntity)
        private candidatoRepository: Repository<CandidatoEntity>,
        private readonly httpService: HttpService
      ) {}


      async votar(dto: CreateVotacionDto): Promise<VotacionEntity> {
        const presidenteId = new ObjectId(dto.presidenteId);
        const vicepresidenteId = new ObjectId(dto.vicepresidenteId);
        const ci = dto.ci;
        const votoExistente = await this.votacionRepository.findOne({
          where: { ci: ci },
        });
    
        if (votoExistente) {
          throw new BadRequestException('El usuario ya ha votado.');
        }
        const presidente = await this.candidatoRepository.findOne({
          where: { _id: presidenteId },
        });
    
        if (!presidente) {
          throw new NotFoundException('Presidente no encontrado');
        }
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
          ci,
          partidoId: dto.partidoId,
        });

        const votoGuardado = await this.votacionRepository.save(nuevoVoto);

        await this.registrarVoto(presidenteId, vicepresidenteId);

        return votoGuardado;
      }

      async registrarVoto(presidenteId: ObjectId, vicepresidenteId: ObjectId): Promise<void> {
        console.log("Registrando voto para presidente ID:", presidenteId);
        console.log("Registrando voto para vicepresidente ID:", vicepresidenteId);
    
        // Incrementar votos del presidente
        const presidente = await this.candidatoRepository.findOne({ where: { _id: presidenteId } });
        if (presidente) {
            const votosPresidente = presidente.cantidadVotos || 0; // Asegurarse de que cantidadVotos no sea null
            console.log('Votos presidente antes de incrementar:', votosPresidente);
            
            await this.candidatoRepository.update(
                { _id: presidenteId },
                { cantidadVotos: votosPresidente + 1 }
            );
            
            console.log('Votos presidente después de incrementar:', votosPresidente + 1);
        } else {
            console.log('No se encontró presidente con ID:', presidenteId);
        }
    
        // Incrementar votos del vicepresidente
        const vicepresidente = await this.candidatoRepository.findOne({ where: { _id: vicepresidenteId } });
        if (vicepresidente) {
            const votosVicepresidente = vicepresidente.cantidadVotos || 0; // Asegurarse de que cantidadVotos no sea null
            console.log('Votos vicepresidente antes de incrementar:', votosVicepresidente);
            
            await this.candidatoRepository.update(
                { _id: vicepresidenteId },
                { cantidadVotos: votosVicepresidente + 1 }
            );
            
            console.log('Votos vicepresidente después de incrementar:', votosVicepresidente + 1);
        } else {
            console.log('No se encontró vicepresidente con ID:', vicepresidenteId);
        }
    } 

    async obtenerVotosPorCandidatos(): Promise<any> {
        const candidatos = await this.candidatoRepository.find();
    
        return candidatos.map(candidato => ({
          candidatoId: candidato._id,
          nombre: candidato.nombre,
          puesto: candidato.puesto,
          totalVotos: candidato.cantidadVotos || 0,
        }));
      }
      async verificarSiYaVoto(ci: string): Promise<boolean> {
        if (!ci || ci.length < 6 || !/^\d+$/.test(ci)) {
          throw new BadRequestException('CI inválido');
        }
        const votoExistente = await this.votacionRepository.findOne({ where: { ci } });
        return !!votoExistente;
      }

      obtenerCandidatos(): Observable<CandidatoEntity[]> {
        return this.httpService.get<{ data?: CandidatoEntity[] } | CandidatoEntity[]>(`${this.apiUrl}/candidatos`).pipe(
          map(response => response.data), // <-- Accede a la propiedad data
          map(data => {
            if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
              return data.data;
            }
            else if (Array.isArray(data)) {
              return data;
            }
            return [];
          }),
          catchError(error => {
            console.error('Error al obtener candidatos:', error);
            return of([]);
          })
        );
      }
      
}
