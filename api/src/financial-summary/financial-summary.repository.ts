import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CashFlowType } from '@prisma/client';
import { CashFlowEntity } from '../cash-flow/entities/cash-flow.entity';

@Injectable()
export class FinancialSummaryRepository {
  constructor(private readonly _prisma: PrismaService) {}

  public async findAll() {
    return this._prisma.cashFlow.findMany();
  }

  public async findMany(type: CashFlowType): Promise<CashFlowEntity[]> {
    return this._prisma.cashFlow.findMany({ where: { type } });
  }
}
