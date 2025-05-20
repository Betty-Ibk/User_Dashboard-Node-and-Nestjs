

import { Controller, Get } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly usersService: UserService) {}

  @Get('users')
  async getUserMetrics() {
    // Use your existing getMetrics method
    const metrics = await this.usersService.getMetrics();
    
    return {
      success: true,
      metrics
    };
  }
}