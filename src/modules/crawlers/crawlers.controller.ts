import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';
import { CrawlersService } from './crawlers.service';
import { TransformInterceptor } from '../../core/utils/transform-interceptor.util';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/crawlers')
export class CrawlersController {
  constructor(private readonly crawlersService: CrawlersService) {}

  @ApiTags('crawlers')
  @Get()
  @UseInterceptors(TransformInterceptor)
  async getResource(@Query('page') page: string) {
    return this.crawlersService.getResource(page);
  }
}
