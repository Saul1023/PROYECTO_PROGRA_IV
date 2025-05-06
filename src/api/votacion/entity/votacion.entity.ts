import { CandidatoEntity } from "src/api/candidatos/entities/candidato.entity";
import { UserEntity } from "src/api/users/entities/user.entity";
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: 'votacion' })
export class VotacionEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @ManyToOne(() => CandidatoEntity, { eager: true })
  presidente: CandidatoEntity;

  @ManyToOne(() => CandidatoEntity, { eager: true })
  vicepresidente: CandidatoEntity;

  @Column()
  fechaVoto: Date;

  @Column()
  ci: string;

  @Column()
  partidoId: string;
} 