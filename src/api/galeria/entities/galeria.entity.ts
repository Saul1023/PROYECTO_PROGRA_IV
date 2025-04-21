import { CandidatoEntity } from "src/api/candidatos/entities/candidato.entity";
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: 'galeria' })
export class GaleriaEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  imagenUrl: string;

  @Column()
  descripcion: string;

  @Column({ type: 'date' })
  fechaPublicacion: Date;

  @ManyToOne(() => CandidatoEntity, candidato => candidato.galeria)
  candidato: CandidatoEntity;
}