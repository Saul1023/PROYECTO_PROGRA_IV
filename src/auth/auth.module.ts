import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/api/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './estrategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[UsersModule,
    JwtModule.register({
      global: true,
      secret: 'Hola mundo cruel...',
      signOptions: { expiresIn: '60s' },
    }),
  ]
})
export class AuthModule {}
