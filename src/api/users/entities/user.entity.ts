import { Column, Entity,ObjectId,ObjectIdColumn,PrimaryGeneratedColumn } from "typeorm";

@Entity({name :'user'})
export class UserEntity{
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ unique: true })
    ci: string;

    @Column()
    fechaRegistro: Date;
    
    @Column({length:200})
    password:string;

    @Column()
    rol: string; 

    @Column()
    foto:string;
}