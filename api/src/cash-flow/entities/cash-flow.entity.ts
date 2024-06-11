import { $Enums, CashFlow as CashFlowModel } from '@prisma/client';

export class CashFlowEntity implements CashFlowModel {
  id: number;
  name: string;
  description: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  type: $Enums.CashFlowType;
}
