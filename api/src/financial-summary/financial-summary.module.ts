import { Module } from '@nestjs/common';
import { FinancialSummaryService } from './financial-summary.service';
import { FinancialSummaryController } from './financial-summary.controller';
import { FinancialSummaryRepository } from './financial-summary.repository';

@Module({
  imports: [],
  controllers: [FinancialSummaryController],
  providers: [FinancialSummaryService, FinancialSummaryRepository],
})
export class FinancialSummaryModule {}
