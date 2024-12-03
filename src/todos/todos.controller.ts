import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseMessage } from './decorators/response-message-decorator';
import { ResponseTransformInterceptor } from './interceptors/response-transform-interceptor';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { TodoDto } from './dto/todo-dto';
import { ResponseDto } from './dto/response.dto';
import { GenericApiResponse } from './decorators/generic-api-response-decorator';

@ApiTags('todos')
@ApiExtraModels(ResponseDto)
@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Todo created successfully')
  @ApiResponse({
    status: 999,
    description: '.',
    type: TodoDto,
  })
  @GenericApiResponse({
    model: TodoDto,
    description: '### Todo has been successfully created.',
  })
  @ApiResponse({ status: 403, description: '### Forbidden.' })
  @ApiOperation({
    summary: '할일 추가하기',
    description: `# 할일 추가하기
    - test`,
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://swagger.io/docs/',
    },
  })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Todos fetched successfully')
  @GenericApiResponse({
    model: TodoDto,
    description: '### Todos have been successfully founded.',
    isArray: true,
  })
  @ApiResponse({ status: 403, description: '### Forbidden.' })
  @ApiOperation({
    summary: '모든 할일 가져오기',
    description: `# 할일 모두 조회`,
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://swagger.io/docs/',
    },
  })
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Todo founded successfully')
  @GenericApiResponse({
    model: TodoDto,
    description: '### Todo has been successfully founded.',
  })
  @ApiResponse({ status: 403, description: '### Forbidden.' })
  @ApiOperation({
    summary: '단일 할일 조회',
    description: `# 단일 할일 조회`,
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://swagger.io/docs/',
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return foundTodo;
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Todo updated successfully')
  @GenericApiResponse({
    model: TodoDto,
    description: '### Todo has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: '### Forbidden.' })
  @ApiOperation({
    summary: '할일 수정',
    description: `# 할일 수정`,
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://swagger.io/docs/',
    },
  })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return await this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Todo deleted successfully')
  @GenericApiResponse({
    model: TodoDto,
    description: '### Todo has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: '### Forbidden.' })
  @ApiOperation({
    summary: '할일 삭제',
    description: `# 할일 삭제`,
    deprecated: false,
    externalDocs: {
      description: '외부 문서',
      url: 'https://swagger.io/docs/',
    },
  })
  async remove(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return await this.todosService.remove(+id);
  }
}
