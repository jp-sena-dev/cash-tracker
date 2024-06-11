enum TransactionTypeEnum {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export type TransactionType = keyof typeof TransactionTypeEnum;


export type CashFlow = {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  type: TransactionType;
  updatedAt: string;
  value: number;
};

export type FinancialSummary = {
  expense: number;
  income: number;
  profit: number;
  cashFlowList: CashFlow[];
}