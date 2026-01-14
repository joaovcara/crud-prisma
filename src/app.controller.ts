import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-user')
  getUser(): Promise<string> {
    return this.appService.getUser();
  }
}
