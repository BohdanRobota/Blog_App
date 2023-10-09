import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Article } from '@prisma/client';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService
  ) { }

  async save(article: Partial<Article>, image): Promise<Article> {
    const fileName = image ? await this.fileService.createFile(image) : null;
    const { title, content, userId, summary } = article;
    return this.prismaService.article.create({
      data: {
        title,
        content,
        image: fileName,
        userId,
        summary
      }
    })
  }

  findAll(): Promise<Article[]> {
    return this.prismaService.article.findMany();
  }

  async findOne(id: string): Promise<Article> {
    return this.prismaService.article.findFirst({
      where: {
        OR: [
          { id }
        ]
      }
    });
  }

  async delete(id: string): Promise<Article> {
    await this.checkArticleExisting(id);
    const deletedArticle = await this.prismaService.article.delete({ where: { id } }).catch(error => {
      throw new Error(error);
    })
    return deletedArticle;
  }

  async checkArticleExisting(id: string) {
    const currenArticle = await this.findOne(id);
    if (!currenArticle) throw new NotFoundException(`Article with id: "${id}" not found`);
    return currenArticle;
  }

}