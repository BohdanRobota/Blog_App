import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [FilesModule]
})
export class ArticleModule { }
