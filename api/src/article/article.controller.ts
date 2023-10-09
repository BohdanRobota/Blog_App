import { Controller, Post, Body, Get, Param, Delete, ParseUUIDPipe, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Article } from '@prisma/client'
import { CreateArticleDto } from './dto';
import { ArticleService } from './article.service';
import { Public } from '@common/decorators';

@Public()
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createArticle(@Body() dto: CreateArticleDto, @UploadedFile() image): Promise<Article> {
    const article = await this.articleService.save(dto, image);
    return article;
  }

  @Get()
  findAllArticles(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  async findOneArticle(@Param('id') id: string): Promise<Article> {
    const article = await this.articleService.findOne(id);
    if (!article) throw new NotFoundException(`Article with this id: "${id}" not found`);
    return article;
  }

  @Delete(':id')
  async deleteArticle(@Param('id', new ParseUUIDPipe()) id: string) {
    const article = await this.articleService.delete(id);
    return article;
  }
}
