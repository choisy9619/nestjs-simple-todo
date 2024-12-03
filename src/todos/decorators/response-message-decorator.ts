import { SetMetadata } from '@nestjs/common';

//사용법 @ResponseMessage('admin')
export const ResponseMessage = (message: string) =>
  SetMetadata('response-message', message);
