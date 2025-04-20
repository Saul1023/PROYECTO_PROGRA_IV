import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      logging:true,
      autoLoadEntities: true,
      /*username: 'root',
      password: 'root',*/
      database: 'Proyecto_vota',
      //entities: [CategoriaEntity],
      synchronize: true, //cuando este en produccion debe estar false.
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
