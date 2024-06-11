import { Controller, Get, Param } from '@nestjs/common';
import { FinancialSummaryService } from './financial-summary.service';
import { CashFlowType } from '@prisma/client';

@Controller('financial-summary')
export class FinancialSummaryController {
  constructor(
    private readonly financialSummaryService: FinancialSummaryService,
  ) {}

  @Get()
  async findAll() {
    return this.financialSummaryService.findAll();
  }

  @Get('/:type')
  async findMany(@Param('type') type: CashFlowType) {
    return this.financialSummaryService.findMany(type);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.financialSummaryService.findOne(+id);
  // }
}
