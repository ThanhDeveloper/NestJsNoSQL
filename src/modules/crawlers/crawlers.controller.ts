import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';
import { CrawlersService } from './crawlers.service';
import { TransformInterceptor } from '../../core/interceptors/transform-interceptor.util';
import { ApiTags } from '@nestjs/swagger';
import { TimeoutInterceptor } from '../../core/interceptors/timeout.interceptor';
import { API_VERSION } from "../../core/constants";

@Controller(API_VERSION + '/crawlers')
export class CrawlersController {
  constructor(private readonly crawlersService: CrawlersService) {}

  @ApiTags('crawlers')
  @Get()
  @UseInterceptors(TransformInterceptor, TimeoutInterceptor)
  async getResource(@Query('page') page: string) {
    return this.crawlersService.getResource(page);
  }
}
