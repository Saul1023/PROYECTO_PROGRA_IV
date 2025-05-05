import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidatoEntity } from './entities/candidato.entity';
import { Like, Repository } from 'typeorm';
import { PartidoEntity } from '../partidos/entities/partido.entity';
import { NewDto } from './dto/new.dto';
import { EditDto } from './dto/edit.dto';
import { ObjectId } from 'mongodb';
@Injectable()
export class CandidatosService {
  constructor(
    @InjectRepository(CandidatoEntity)
    private candidatoRepository: Repository<CandidatoEntity>,
    @InjectRepository(PartidoEntity)
    private partidoRepository: Repository<PartidoEntity>,
  ) {}

  public list(): Promise<CandidatoEntity[]> {
    return this.candidatoRepository.find({
      relations: ['partido'],
      order: { nombre: 'ASC' },
    });
  }

  public async loadPartidos(): Promise<PartidoEntity[]> {
    try {
      return await this.partidoRepository.find();  // Retorna todos los partidos disponibles
    } catch (error) {
      throw new InternalServerErrorException('Error al cargar partidos');
    }
  }

  // Método para buscar candidatos con paginación
  public async searchPaginate(
    page: number,
    limit: number,
    search: string = '',
  ) {
    const skip = page * limit;

    const query: any = {};
    if (search.trim() !== '') {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { apellido: { $regex: search, $options: 'i' } },
        { puesto: { $regex: search, $options: 'i' } },
      ];
    }

    try {
      const mongoManager = this.candidatoRepository.manager;

      const items = await mongoManager.find(CandidatoEntity, {
        where: query,
        skip,
        take: limit,
        relations: ['partido'],
        order: { nombre: 'ASC' },
      });

      const totalCount = (await mongoManager.find(CandidatoEntity, {
        where: query,
      })).length;

      return { items, totalCount };
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar candidatos');
    }
  }

  // Método para agregar un nuevo candidato
  public async add(dto: NewDto): Promise<CandidatoEntity> {
    // Verifica que dto.partidoId esté presente y sea una cadena válida
    let partido: PartidoEntity | null = null;

    if (dto.partidoId) {
      if (!ObjectId.isValid(dto.partidoId)) {
        throw new BadRequestException('ID de partido inválido');
      }
    
      const partidoId = new ObjectId(dto.partidoId);
      partido = await this.partidoRepository.findOne({
        where: { _id: partidoId },
      });
    
      if (!partido) {
        throw new NotFoundException('Partido no encontrado');
      }
    }

    let fechaNacimiento = null;

    if (dto.fechaNacimiento) {
      fechaNacimiento = new Date(dto.fechaNacimiento);
      if (isNaN(fechaNacimiento.getTime())) {
        throw new BadRequestException('Fecha de nacimiento inválida. Debe ser una fecha en formato ISO 8601');
      }
    }

    const nuevoCandidato = this.candidatoRepository.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      fechaNacimiento,
      biografia: dto.biografia,
      puesto: dto.puesto,
      foto: dto.foto,
      partido: partido ?? undefined,
    });

    return await this.candidatoRepository.save(nuevoCandidato);
  }

  // Método para editar un candidato existente
  public async edit(id: string, dto: EditDto) {
    // 1. Validar ID
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID de candidato inválido');
    }
  
    // 2. Buscar candidato existente
    const candidato = await this.candidatoRepository.findOne({ 
      where: { _id: new ObjectId(id) }
    });
  
    if (!candidato) {
      throw new NotFoundException('Candidato no encontrado');
    }
  
    // 3. Actualizar campos
    if (dto.fechaNacimiento) {
      candidato.fechaNacimiento = new Date(dto.fechaNacimiento);
    }
  
    if (dto.partidoId) {
      const partido = await this.partidoRepository.findOne({
        where: { _id: new ObjectId(dto.partidoId) }
      });
      if (!partido) throw new NotFoundException('Partido no encontrado');
      candidato.partido = partido;
    }
  
    // Actualizar otros campos
    Object.assign(candidato, dto);
  
    // 4. Guardar cambios
    await this.candidatoRepository.save(candidato);
  
    return { 
      success: true,
      message: 'Candidato actualizado correctamente',
      data: candidato
    };
  }

  // Método para eliminar un candidato
  public async delete(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID no válido');
    }

    const result = await this.candidatoRepository.delete({ _id: new ObjectId(id) });

    if (result.affected === 0) {
      throw new NotFoundException('Candidato no encontrado');
    }

    return { message: 'Candidato eliminado correctamente' };
  }

  // Método para activar un candidato
  public async activar(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID no válido');
    }

    const result = await this.candidatoRepository.update({ _id: new ObjectId(id) }, { estado: 1 });

    if (result.affected === 0) {
      throw new NotFoundException('Candidato no encontrado para activar');
    }

    return { message: 'Candidato activado correctamente' };
  }
  
}
