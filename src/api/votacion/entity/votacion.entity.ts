import { CandidatoEntity } from "src/api/candidatos/entities/candidato.entity";
import { UserEntity } from "src/api/users/entities/user.entity";
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: 'votacion' })
export class VotacionEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @ManyToOne(() => CandidatoEntity)
  candidato: CandidatoEntity;

  @Column()
  fechaVoto: Date;
}