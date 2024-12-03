import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTransformInterceptor } from './todos/interceptors/response-transform-interceptor';
import { ResponseMessage } from './todos/decorators/response-message-decorator';

@Controller('root')
@UseInterceptors(ResponseTransformInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  @ResponseMessage('성공적으로 들어왔습니다')
  getHello(@Param('name') name: string) {
    return {
      data: '오늘도 코딩!!' + name,
      message: '하하하',
    };
  }
}
