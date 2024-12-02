import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getHello(@Param('name') name: string): string {
    return '오늘도 코딩' + name;
    // return this.appService.getHello();
  }
}
