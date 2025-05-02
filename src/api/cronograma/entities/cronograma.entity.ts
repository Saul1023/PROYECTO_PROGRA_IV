// cronograma/entities/actividad.entity.ts
import { CandidatoEntity } from 'src/api/candidatos/entities/candidato.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity({ name: 'cronograma' })
export class CronogramaEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  actividad: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ default: 1 })
  estado: number;

  /*@ManyToOne(() => CandidatoEntity, candidato => candidato.cronograma)
  candidato: CandidatoEntity;*/
  @ManyToOne(() => CandidatoEntity, candidato => candidato.cronograma, { nullable: true })
  candidato?: CandidatoEntity;

}
