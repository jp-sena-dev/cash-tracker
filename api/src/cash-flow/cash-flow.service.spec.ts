import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CashFlowService } from './cash-flow.service';
import { Test } from '@nestjs/testing';
import { CreateCashFlowDTO } from './dto/create-cash-flow.dto';
import { cashFlowMock, cashFlowsMock } from '../shared/mocks/cash-flow.mock';
import { CashFlowRepository } from './cash-flow.repository';
import { NotFoundException } from '@nestjs/common';

describe('CashFlowController', () => {
  let service: CashFlowService;
  let repository: DeepMockProxy<CashFlowRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CashFlowService,
        {
          provide: CashFlowRepository,
          useValue: mockDeep<CashFlowRepository>(),
        },
      ],
    }).compile();

    service = module.get<CashFlowService>(CashFlowService);
    repository = module.get<DeepMockProxy<CashFlowRepository>>(CashFlowRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create()', () => {
    const payload: CreateCashFlowDTO = {
      name: 'cash flow',
      description: 'description',
      type: 'EXPENSE',
      value: 0,
    };

    it('should return the created cash flow', async () => {
      repository.create.mockResolvedValue(cashFlowMock);

      const createdCashFlow = await service.create(payload);

      expect(createdCashFlow).toBeDefined();
      expect(createdCashFlow).toEqual(cashFlowMock);
      expect(repository.create).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(payload);
    });
  });

  describe('getAll()', () => {
    it('should return all cash flows', async () => {
      repository.getAll.mockResolvedValue(cashFlowsMock);

      const cashFlowList = await service.getAll();

      expect(cashFlowList).toBeDefined();
      expect(cashFlowList).toEqual(cashFlowsMock);
      expect(repository.getAll).toHaveBeenCalled();
      expect(repository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('should return the updated cash flow if it exists', async () => {
      repository.update.mockResolvedValue(cashFlowMock);
      repository.findOne.mockResolvedValue(cashFlowMock);

      const updatedCashFlow = await service.update(cashFlowMock.id, {});

      expect(updatedCashFlow).toBeDefined();
      expect(updatedCashFlow).toEqual(cashFlowMock);
      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalledWith(cashFlowMock.id, {});
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if cash flow does not exist', async () => {
      repository.update.mockResolvedValue(null);

      await expect(service.update(cashFlowMock.id, {})).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('delte()', () => {
    it('should return the deleted cash flow if it exists', async () => {
      repository.delete.mockResolvedValue(cashFlowMock);
      repository.findOne.mockResolvedValue(cashFlowMock);

      const deletedCashFlow = await service.delete(cashFlowMock.id);

      expect(deletedCashFlow).toBeDefined();
      expect(deletedCashFlow).toEqual(cashFlowMock);
      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalledWith(cashFlowMock.id);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if cash flow does not exist', async () => {
      repository.delete.mockResolvedValue(null);

      await expect(service.delete(cashFlowMock.id)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
