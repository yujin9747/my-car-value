import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../users/controllers/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Serialize } from '../users/controllers/decorators/interceptor.decorator';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
