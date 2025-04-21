import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import * as bycrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userServices: UsersService,
        private jwtService:JwtService
    ){}

    async signIn(email: string, password: string) {
        const user = await this.userServices.find(email);
      
        if (!user) {
          throw new UnauthorizedException('Error de acceso');
        }
      
        const isMatch = await bycrypt.compare(password, user.password);
      
        if (!isMatch) {
          throw new UnauthorizedException('Error de acceso');
        }
      
        const { password: _, ...userWithoutPassword } = user; 
      
        const token = await this.jwtService.signAsync(
          {
            id: user._id,
            email: user.email,
          },
          {
            secret: 'Hola mundo cruel...',
            expiresIn: '1h',
          },
        );
      
        return { access_token: token };
      }
}
