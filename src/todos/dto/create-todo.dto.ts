import { IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '할 일의 제목',
    example: '오늘도 코딩!',
    default: '제목 없음',
    minimum: 6,
    maximum: 30,
  })
  @IsString({
    message: '제목은 문자열만 가능합니다',
  })
  @MinLength(6, {
    message: '제목은 $constraint1자 이상 작성해주세요 (입력 값: $value)',
  })
  @MaxLength(30, {
    message: '제목은 $constraint1자를 넘길 수 없습니다 (입력 값: $value)',
  })
  title: string;

  @ApiProperty({
    required: true,
    type: 'boolean',
    description: '할일 완료 여부',
    example: false,
    default: false,
  })
  @IsBoolean({
    message: 'Boolean 타입만 가능합니다',
  })
  is_done: boolean;
}
