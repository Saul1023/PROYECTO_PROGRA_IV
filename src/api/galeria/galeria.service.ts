import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GaleriaEntity } from './entities/galeria.entity';
import { Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { NewGaleriaDto } from './dto/newgaleria.dto';
import { EditGaleriaDto } from './dto/editgaleria.dto';

@Injectable()
export class GaleriaService {constructor(
    @InjectRepository(GaleriaEntity)
    private galeriaRepo: Repository<GaleriaEntity>,

    @InjectRepository(CandidatoEntity)
    private candidatoRepo: Repository<CandidatoEntity>,
  ) {}

  async findAll(): Promise<GaleriaEntity[]> {
    return await this.galeriaRepo.find({ relations: ['candidato'] });
  }

  async add(dto: NewGaleriaDto): Promise<GaleriaEntity> {
    const candidato = await this.candidatoRepo.findOneBy({ _id: dto.candidatoId as any });
    if (!candidato) throw new NotFoundException('Candidato no encontrado');

    const nuevaGaleria = this.galeriaRepo.create({
      imagenUrl: dto.imagenUrl,
      descripcion: dto.descripcion,
      fechaPublicacion: dto.fechaPublicacion,
      candidato,
    });

    return await this.galeriaRepo.save(nuevaGaleria);
  }

  async edit(id: string, dto: EditGaleriaDto) {
    return await this.galeriaRepo.update(id, dto);
  }

  async delete(id: string) {
    return await this.galeriaRepo.delete(id);
  }}
