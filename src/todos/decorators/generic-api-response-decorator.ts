import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { TodoDto } from '../dto/todo-dto';

export interface GenericApiResponseOption<TModel extends Type<any>> {
  model: TModel;
  status?: number;
  description?: string;
  isArray?: boolean;
}

export const GenericApiResponse = (option: GenericApiResponseOption<Type>) => {
  const { model, status, description, isArray } = option;

  if (isArray) {
    return applyDecorators(
      ApiExtraModels(TodoDto, model),
      ApiResponse({
        status: status || 200,
        description: description || 'Success',
        schema: {
          allOf: [
            { $ref: getSchemaPath(TodoDto) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(model) },
                },
              },
            },
          ],
        },
      }),
    );
  } else {
    return applyDecorators(
      ApiExtraModels(TodoDto, model),
      ApiResponse({
        status: status || 200,
        description: description || 'Success',
        schema: {
          allOf: [
            { $ref: getSchemaPath(TodoDto) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(model),
                },
              },
            },
          ],
        },
      }),
    );
  }
};
