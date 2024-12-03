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

@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Todo created successfully')
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Todos fetched successfully')
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Todo founded successfully')
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
  async remove(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return await this.todosService.remove(+id);
  }
}
