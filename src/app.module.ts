
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MetricsModule } from './metrics/metrics.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Teminitoluwa123', 
      database: 'nodedbase',
      entities: [User],
      synchronize: true, 
      driver: require('mysql2'),
    }),
    UsersModule, 
    MetricsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}