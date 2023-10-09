import { IsString, MinLength } from "class-validator";

export class CreateArticleDto {
  @IsString()
  @MinLength(10)
  title: string

  @IsString()
  @MinLength(30)
  summary: string

  @IsString()
  @MinLength(300)
  content: string

  @IsString()
  userId: string
}