
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [
    UsersModule, // Import UsersModule to access UserService
  ],
  controllers: [MetricsController],
})
export class MetricsModule {}