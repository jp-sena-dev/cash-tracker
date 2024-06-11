import { CashFlowEntity } from '../../cash-flow/entities/cash-flow.entity';

export const cashFlowMock: CashFlowEntity = {
  id: 0,
  name: 'cash flow',
  description: 'cash flow description',
  value: 0,
  type: 'INCOME',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const prismaMock = {
  post: {
    create: jest.fn().mockReturnValue(cashFlowMock[0]),
    findMany: jest.fn().mockResolvedValue(cashFlowMock),
    findUnique: jest.fn().mockResolvedValue(cashFlowMock[0]),
    update: jest.fn().mockResolvedValue(cashFlowMock[0]),
    delete: jest.fn(),
  },
};

export const cashFlowsMock: CashFlowEntity[] = [cashFlowMock];
