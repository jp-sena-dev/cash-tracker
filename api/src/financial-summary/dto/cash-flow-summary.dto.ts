import { CreateCashFlowDTO } from '../../cash-flow/dto/create-cash-flow.dto';

export class FinancialSummaryDTO {
  profit: number;
  expense: number;
  income: number;
  cashFlowList: CreateCashFlowDTO[];
}
