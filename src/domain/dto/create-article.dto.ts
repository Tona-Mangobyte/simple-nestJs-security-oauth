import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'simple article title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'simple article content' })
  @IsNotEmpty()
  content: string;
}
