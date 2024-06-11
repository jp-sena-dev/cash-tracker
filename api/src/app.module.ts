import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashFlowModule } from './cash-flow/cash-flow.module';
import { ConfigModule } from '@nestjs/config';
import { FinancialSummaryModule } from './financial-summary/financial-summary.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptions } from './shared/filters/global-exceptions';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    CashFlowModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FinancialSummaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptions,
    },
  ],
})
export class AppModule {}
