import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './modules/reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './modules/reports/report.entity';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
