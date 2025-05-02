import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronogramaEntity } from './entities/cronograma.entity';
import { Like, Repository } from 'typeorm';
import { CandidatoEntity } from '../candidatos/entities/candidato.entity';
import { NewCronogramaDto } from './dto/newcronograma.dto';
import { EditCronogramaDto } from './dto/editcronograma.dto';
import { ObjectId } from 'mongodb';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CronogramaService {
    constructor(
        @InjectRepository(CronogramaEntity)
        private cronogramaRepo: Repository<CronogramaEntity>,
    
        @InjectRepository(CandidatoEntity)
        private candidatoRepo: Repository<CandidatoEntity>,
      ) {}
    
     public async list(): Promise<CronogramaEntity[]> {
        return await this.cronogramaRepo.find({order:{actividad:'ASC'}});
      }
      
      async searchPaginate(page: number, limit: number, search: string) {
        const skip = page * limit;
      
        const where = search
          ? { actividad: Like(`%${search}%`) }
          : {};
      
        const [result, total] = await this.cronogramaRepo.findAndCount({
          where,
          skip,
          take: limit,
          relations: ['candidatos'],
        });
      
        // Convertir el resultado a un formato adecuado
        const data = plainToClass(CronogramaEntity, result);
      
        return {
          data: data,
          total,
          page,
          limit,
        };
      }
      
      async add(dto: NewCronogramaDto): Promise<CronogramaEntity> {
        let candidato: CandidatoEntity | null = null;
      
        if (dto.candidatoId) {
          candidato = await this.candidatoRepo.findOneBy({ _id: new ObjectId(dto.candidatoId) });
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

      /*async add(dto: NewCronogramaDto): Promise<CronogramaEntity> {
        const candidato = await this.candidatoRepo.findOneBy({ _id: new ObjectId(dto.candidatoId) });

        if (!candidato) throw new NotFoundException('Candidato no encontrado');
    
        const nuevoEvento = this.cronogramaRepo.create({
          actividad: dto.actividad,
          fecha: dto.fecha,
          descripcion: dto.descripcion,
          candidato,
        });
    
        return await this.cronogramaRepo.save(nuevoEvento);
      }*/
    
      public async edit(id: string, dto: EditCronogramaDto) {
        const cronograma = await this.cronogramaRepo.findOneBy({ _id: new ObjectId(id) });
        if (!cronograma) throw new NotFoundException('Cronograma no encontrado');
      
        Object.assign(cronograma, dto);
        return await this.cronogramaRepo.save(cronograma);
      }
      
      public async delete(id: string) {
        const cronograma = await this.cronogramaRepo.findOneBy({ _id: new ObjectId(id) });
        if (!cronograma) throw new NotFoundException('Cronograma no encontrado');
      
        return await this.cronogramaRepo.delete(id);
      }

      public async activar(id){
        return await this.cronogramaRepo.update(id,{estado:1});
        //return await this.unidadRepository.delete(id);
      }
}
