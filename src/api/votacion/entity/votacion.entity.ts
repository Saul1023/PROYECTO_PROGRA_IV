import { CandidatoEntity } from "src/api/candidatos/entities/candidato.entity";
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: 'votacion' })
export class VotacionEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @ManyToOne(() => CandidatoEntity)
  candidato: CandidatoEntity;

  @Column()
  usuarioId: string;
  
  @Column()
  fechaVoto: Date;

  @Column()
  cantidadVotos: number;
}