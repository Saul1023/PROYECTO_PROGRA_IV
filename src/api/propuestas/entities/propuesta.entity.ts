import { CandidatoEntity } from "src/api/candidatos/entities/candidato.entity";
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({name:'propuesta'})
export class PropuestaEntity {
  @ObjectIdColumn()
   _id: ObjectId;

  @Column()
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column({ type: 'date' })
  fechaPropuesta: Date;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => CandidatoEntity, candidato => candidato.propuestas)
  candidato: CandidatoEntity;
}