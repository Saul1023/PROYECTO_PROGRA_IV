import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import * as bycrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userServices: UsersService,
        private jwtService:JwtService
    ){}

    async signIn(ci: string, password: string) {
        const user = await this.userServices.find(ci);
      
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
            ci: user.ci,
            rol: user.rol,
          },
          {
            secret: 'Hola mundo cruel...',
            expiresIn: '1h',
          },
        );
        
        return { access_token: token, rol: user.rol };
      }
}
