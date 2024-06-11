import { Injectable, NotFoundException } from '@nestjs/common';
import { CashFlowType } from '@prisma/client';
import { FinancialSummaryRepository } from './financial-summary.repository';
import { CashFlowEntity } from '../cash-flow/entities/cash-flow.entity';

@Injectable()
export class FinancialSummaryService {
  constructor(
    private readonly financialSummaryRepository: FinancialSummaryRepository,
  ) {}

  private calculateTotalCash(
    cashFlowList: CashFlowEntity[],
    type: CashFlowType,
  ): number {
    return cashFlowList.reduce(
      (acc, cashFlow) => (cashFlow.type === type ? acc + cashFlow.value : acc),
      0,
    );
  }

  async findAll() {
    const cashFlows = await this.financialSummaryRepository.findAll();
    if (!cashFlows) throw new NotFoundException();

    const expense = this.calculateTotalCash(cashFlows, 'EXPENSE');
    const income = this.calculateTotalCash(cashFlows, 'INCOME');
    const profit = income - expense;

    return {
      profit,
      expense,
      income,
      cashFlowList: cashFlows,
    };
  }

  async findMany(type: CashFlowType) {
    const cashFlows = await this.financialSummaryRepository.findMany(type);

    return {
      value: this.calculateTotalCash(cashFlows, type),
      cashFlowsList: cashFlows,
    };
  }
}
