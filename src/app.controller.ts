import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getJira(): any {
    return this.appService.getJira();
  }

  @Post()
  createIssue(@Body() createData: object): any {
    return this.appService.createIssue(createData);
  }
}
