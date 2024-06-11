import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCashFlowDTO } from './dto/create-cash-flow.dto';
import { cashFlowMock, cashFlowsMock } from '../shared/mocks/cash-flow.mock';
import { CashFlowRepository } from './cash-flow.repository';
import { PrismaService } from '../shared/services/prisma.service';

describe('CashFlowRepository', () => {
  let repository: CashFlowRepository;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const prismaServiceMock = mockDeep<PrismaService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CashFlowRepository,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    repository = module.get<CashFlowRepository>(CashFlowRepository);
    prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create()', () => {
    it('should create a cash flow', async () => {
      const payload: CreateCashFlowDTO = {
        name: 'cash flow',
        description: 'description',
        type: 'EXPENSE',
        value: 10,
      };

      prismaService.cashFlow.create.mockResolvedValue(cashFlowMock);

      const createdCashFlow = await repository.create(payload);

      expect(createdCashFlow).toBeDefined();
      expect(createdCashFlow).toEqual(cashFlowMock);
      expect(prismaService.cashFlow.create).toHaveBeenCalledWith({
        data: payload,
      });
    });
  });

  // describe('getAll()', () => {
  //   it('should return all cash flows', async () => {
  //     prismaService.cashFlow.findMany.mockResolvedValue(cashFlowsMock);

  //     const cashFlowList = await repository.getAll();

  //     expect(cashFlowList).toBeDefined();
  //     expect(cashFlowList).toEqual(cashFlowsMock);
  //     expect(repository.getAll).toHaveBeenCalled();
  //     expect(repository.getAll).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('update()', () => {
  //   it('should return the updated cash flow if it exists', async () => {
  //     prismaService.cashFlow.update.mockResolvedValue(cashFlowMock);

  //     const updatedCashFlow = await repository.update(cashFlowMock.id, {});

  //     expect(updatedCashFlow).toBeDefined();
  //     expect(updatedCashFlow).toEqual(cashFlowMock);
  //     expect(prismaService.cashFlow.update).toHaveBeenCalled();
  //     expect(prismaService.cashFlow.update).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('delte()', () => {
  //   it('should return the deleted cash flow if it exists', async () => {
  //     prismaService.cashFlow.delete.mockResolvedValue(cashFlowMock);

  //     const deletedCashFlow = await repository.delete(cashFlowMock.id);

  //     expect(deletedCashFlow).toBeDefined();
  //     expect(deletedCashFlow).toEqual(cashFlowMock);
  //     expect(prismaService.cashFlow.delete).toHaveBeenCalled();
  //     expect(prismaService.cashFlow.delete).toHaveBeenCalledTimes(1);
  //   });
  // });
});
