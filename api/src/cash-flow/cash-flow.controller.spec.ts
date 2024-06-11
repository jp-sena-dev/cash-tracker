import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CashFlowController } from './cash-flow.controller';
import { CashFlowService } from './cash-flow.service';
import { Test } from '@nestjs/testing';
import { CreateCashFlowDTO } from './dto/create-cash-flow.dto';
import { cashFlowMock, cashFlowsMock } from '../shared/mocks/cash-flow.mock';
import { CashFlowRepository } from './cash-flow.repository';
import { UpdateCashFlowDTO } from './dto/update-cash-flow.dto';

describe('CashFlowController', () => {
  let controller: CashFlowController;
  let service: DeepMockProxy<CashFlowService>;
  let repository: CashFlowRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CashFlowController],
      providers: [
        {
          provide: CashFlowService,
          useValue: mockDeep<CashFlowService>(),
        },
        {
          provide: CashFlowRepository,
          useValue: mockDeep<CashFlowRepository>(),
        },
      ],
    }).compile();

    controller = module.get<CashFlowController>(CashFlowController);
    repository = module.get<CashFlowRepository>(CashFlowRepository);
    service = module.get<DeepMockProxy<CashFlowService>>(CashFlowService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('post()', () => {
    const payload: CreateCashFlowDTO = {
      name: 'cash flow',
      description: 'description',
      type: 'EXPENSE',
      value: 10,
    };

    it('should return the created cash flow', async () => {
      service.create.mockResolvedValue(cashFlowMock);

      const cashFlow = await controller.create(payload);

      expect(cashFlow).toBeDefined();
      expect(cashFlow).toEqual(cashFlowMock);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(payload);
    });
  });

  describe('patch()', () => {
    const payload: UpdateCashFlowDTO = {
      name: 'cash flow',
      description: 'description',
      type: 'EXPENSE',
      value: 10,
    };
    it('should return the updated cash flow', async () => {
      service.update.mockResolvedValue(cashFlowMock);

      const cashFlow = await controller.update(`${cashFlowMock.id}`, payload);

      expect(cashFlow).toBeDefined();
      expect(cashFlow).toEqual(cashFlowMock);
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete()', () => {
    it('should return the deleted cash flow', async () => {
      service.delete.mockResolvedValue(cashFlowMock);

      const cashFlowDeleted = await controller.delete(`${cashFlowMock.id}`);

      expect(cashFlowDeleted).toBeDefined();
      expect(cashFlowDeleted).toEqual(cashFlowMock);
      expect(service.delete).toHaveBeenCalled();
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll()', () => {
    it('should return all cash flows', async () => {
      service.getAll.mockResolvedValue(cashFlowsMock);

      const cashFlowDeleted = await controller.findAll();

      expect(cashFlowDeleted).toBeDefined();
      expect(cashFlowDeleted).toEqual(cashFlowsMock);
      expect(service.getAll).toHaveBeenCalled();
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
