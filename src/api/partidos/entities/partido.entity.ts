// partidos/entities/partido.entity.ts
import { CandidatoEntity } from 'src/api/candidatos/entities/candidato.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ObjectIdColumn, ObjectId } from 'typeorm';


@Entity({name :'partido'})
export class PartidoEntity {
  @ObjectIdColumn()
   _id: ObjectId;

  @Column()
  nombre: string;

  @Column()
  lema: string;
  
  @Column({ nullable: true })
  foto: string;

  @Column({ default: 1 })
  estado: number;

  @OneToMany(() => CandidatoEntity, (candidato) => candidato.partido)
  candidatos: CandidatoEntity[];
}