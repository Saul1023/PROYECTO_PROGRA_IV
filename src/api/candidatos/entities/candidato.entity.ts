import { ObjectId } from "mongodb";
import { CronogramaEntity } from "src/api/cronograma/entities/cronograma.entity";
import { GaleriaEntity } from "src/api/galeria/entities/galeria.entity";
import { PartidoEntity } from "src/api/partidos/entities/partido.entity";
import { PropuestaEntity } from "src/api/propuestas/entities/propuesta.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany } from "typeorm";

@Entity({name :'candidato'})
export class CandidatoEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({type: 'date'})
  fechaNacimiento: Date;

  @Column({ nullable: true })
  biografia?: string;

  @Column()
  puesto: string; 

  @Column({ nullable: true })
  foto?: string;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => PartidoEntity, (partido) => partido.candidatos, { nullable: true })
  partido?: PartidoEntity;
  @OneToMany(() => PropuestaEntity, (propuesta) => propuesta.candidato)
  propuestas: PropuestaEntity[];
  @OneToMany(() => GaleriaEntity, (galeria) => galeria.candidato)
  galeria: GaleriaEntity[];
  @OneToMany(() => CronogramaEntity, cronograma => cronograma.candidato)
  cronograma: CronogramaEntity[];

  @Column({ default: 0 })
  cantidadVotos: number;
}