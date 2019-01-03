import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/general-data')
  getGeneralData(): string {
    return this.appService.getGeneralData();
  }
}
