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
    delete(id: string) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(CandidatoEntity)
        private candidatoRepository: Repository<CandidatoEntity>,
        @InjectRepository(PartidoEntity)
        private partidoRepository: Repository<PartidoEntity>,
      ) {}
    
      public list(): Promise<CandidatoEntity[]> {
        return this.candidatoRepository.find({
          relations: ['partido'], // Cargamos la relación de partido
          order: { nombre: 'ASC' },
        });
      }
    
      public async searchPaginate(
        page: number,
        limit: number,
        search: string = '',
      ) {
        const skip = page * limit;
      
        console.log('Buscar candidatos - Skip:', skip, 'Límite:', limit, 'Búsqueda:', search);
      
        const query: any = {};
      
        if (search.trim() !== '') {
          query.$or = [
            { nombre: { $regex: search, $options: 'i' } },
            { apellido: { $regex: search, $options: 'i' } },
            { puesto: { $regex: search, $options: 'i' } }
          ];
        }
      
        try {
          const mongoManager = this.candidatoRepository.manager;
      
          // Obtener candidatos paginados
          const items = await mongoManager.find(CandidatoEntity, {
            where: query,
            skip,
            take: limit,
            relations: ['partido'],
            order: { nombre: 'ASC' },
          });
      
          // Contar total (sin paginación)
          const totalCount = (await mongoManager.find(CandidatoEntity, {
            where: query,
          })).length;
      
          console.log('Candidatos encontrados:', JSON.stringify(items, null, 2));
          console.log('Total candidatos encontrados:', totalCount);
      
          return { items, totalCount };
        } catch (error) {
          console.error('Error en searchPaginate:', error);
          throw new InternalServerErrorException('Error al buscar candidatos');
        }
      }
    
      /*
      public async add(dto: NewDto): Promise<CandidatoEntity> {
        // 1. Verificar si partidoId es válido
        const partido = await this.partidoRepository.findOne({
            where: { _id: new ObjectId(dto.partidoId) },
        });
    
        if (!partido) {
            throw new NotFoundException('Partido no encontrado');
        }
    
        // 2. Validar y convertir la fecha de nacimiento
        if (!dto.fechaNacimiento) {
            throw new BadRequestException('La fecha de nacimiento no puede estar vacía');
        }
    
        const fechaNacimiento = new Date(dto.fechaNacimiento);
    
        // 3. Verificar que la fecha es válida
        if (isNaN(fechaNacimiento.getTime())) {
            throw new BadRequestException('Fecha de nacimiento inválida. Debe ser una fecha en formato ISO 8601');
        }
    
        // 4. Crear el nuevo candidato
        const nuevoCandidato = this.candidatoRepository.create({
            nombre: dto.nombre,
            apellido: dto.apellido,
            fechaNacimiento: fechaNacimiento,
            biografia: dto.biografia,
            puesto: dto.puesto,
            estado: dto.estado ?? 1,
            partido: partido,
        });
    
        return await this.candidatoRepository.save(nuevoCandidato);
    }
    */

    public async add(dto: NewDto): Promise<CandidatoEntity> {
      // 1. Verificar si partidoId es válido
      const partido = await this.partidoRepository.findOne({
          where: { _id: new ObjectId(dto.partidoId) },
      });
  
      if (!partido) {
          throw new NotFoundException('Partido no encontrado');
      }
  
      // 2. Validar y convertir la fecha de nacimiento solo si está presente
      let fechaNacimiento = null;
  
      if (dto.fechaNacimiento) {
          fechaNacimiento = new Date(dto.fechaNacimiento);
  
          // 3. Verificar que la fecha es válida
          if (isNaN(fechaNacimiento.getTime())) {
              throw new BadRequestException('Fecha de nacimiento inválida. Debe ser una fecha en formato ISO 8601');
          }
      }
  
      // 4. Crear el nuevo candidato
      const nuevoCandidato = this.candidatoRepository.create({
          nombre: dto.nombre,
          apellido: dto.apellido,
          fechaNacimiento: fechaNacimiento,
          biografia: dto.biografia,
          puesto: dto.puesto,
          estado: dto.estado ?? 1,
          partido: partido,
      });
  
      return await this.candidatoRepository.save(nuevoCandidato);
  }
  /*
      public async edit(id: string, dto: EditDto) {
        if (!ObjectId.isValid(id)) {
          throw new BadRequestException('ID no válido');
        }
    
        const updateData: any = { ...dto };
    
        if (dto.partidoId) {
          const partido = await this.partidoRepository.findOne({
            where: { _id: new ObjectId(dto.partidoId) },
          });
    
          if (!partido) {
            throw new NotFoundException('Partido no encontrado');
          }
    
          updateData.partido = partido;
        }
    
        await this.candidatoRepository.update(
          { _id: new ObjectId(id) },
          updateData,
        );
    
        return { message: 'Candidato actualizado correctamente' };
      }
    
      public async delete(id: string) {
        return await this.candidatoRepository.delete({ _id: new ObjectId(id) });
      }
    */
      public async edit(id: string, dto: EditDto) {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestException('ID no válido');
        }
    
        const updateData: any = { ...dto };
    
        // Validar la fecha de nacimiento solo si está presente
        if (dto.fechaNacimiento) {
            const fechaNacimiento = new Date(dto.fechaNacimiento);
    
            // Verificar que la fecha es válida
            if (isNaN(fechaNacimiento.getTime())) {
                throw new BadRequestException('Fecha de nacimiento inválida. Debe ser una fecha en formato ISO 8601');
            }
    
            updateData.fechaNacimiento = fechaNacimiento;
        }
    
        if (dto.partidoId) {
            const partido = await this.partidoRepository.findOne({
                where: { _id: new ObjectId(dto.partidoId) },
            });
    
            if (!partido) {
                throw new NotFoundException('Partido no encontrado');
            }
    
            updateData.partido = partido;
        }
    
        await this.candidatoRepository.update(
            { _id: new ObjectId(id) },
            updateData,
        );
    
        return { message: 'Candidato actualizado correctamente' };
    }
    
      public async activar(id) {
        return await this.partidoRepository.update(id, { estado: 1 });
      }
}
