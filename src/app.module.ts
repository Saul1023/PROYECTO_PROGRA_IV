import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { PartidosModule } from './api/partidos/partidos.module';
import { CandidatosModule } from './api/candidatos/candidatos.module';
import { PropuestasModule } from './api/propuestas/propuestas.module';
import { GaleriaModule } from './api/galeria/galeria.module';
import { VotacionModule } from './api/votacion/votacion.module';
import { CronogramaModule } from './api/cronograma/cronograma.module';
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
    PartidosModule,
    CandidatosModule,
    PropuestasModule,
    GaleriaModule,
    VotacionModule,
    CronogramaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
