import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
            private readonly userRepository:Repository<UserEntity>,
    ){}
    public async find(ci: string) {
        return await this.userRepository.findOne({
            where: {
                ci: ci,
            },
        });
    }
    public async add(user) {
        user.password = bcrypt.hashSync(user.password, 10);
        return await this.userRepository.save(user);
    }
    
}
