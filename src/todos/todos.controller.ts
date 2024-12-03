import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Res,
  HttpException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';

// 서버루트/todos
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // @Post()
  // @HttpCode(HttpStatus.OK)
  // create(@Body() createTodoDto: CreateTodoDto) {
  //   return this.todosService.create(createTodoDto);
  // }

  // @Post()
  // async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
  //   const createdTodo = await this.todosService.create(createTodoDto);
  //   res.status(HttpStatus.OK).json({
  //     message: 'Todo created successfully',
  //     statusCode: 200,
  //     data: createdTodo,
  //   });
  // }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return {
      message: 'Todo created successfully',
      statusCode: 200,
      data: createdTodo,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const fetchedTodos = await this.todosService.findAll();
    return {
      message: 'Todos fetched successfully',
      statusCode: 200,
      data: fetchedTodos,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Todo founded successfully',
      statusCode: 200,
      data: foundTodo,
    };
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const updatedTodo = await this.todosService.update(+id, updateTodoDto);

    return {
      message: 'Todo updated successfully',
      statusCode: 200,
      data: updatedTodo,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const deletedTodo = await this.todosService.remove(+id);

    return {
      message: 'Todo founded successfully',
      statusCode: 204,
      data: deletedTodo,
    };
  }
}
