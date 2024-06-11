import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashFlowDTO } from './dto/create-cash-flow.dto';
import { CashFlowRepository } from './cash-flow.repository';
import { UpdateCashFlowDTO } from './dto/update-cash-flow.dto';

@Injectable()
export class CashFlowService {
  constructor(private readonly cashFlowRepository: CashFlowRepository) {}

  public async create(data: CreateCashFlowDTO) {
    return this.cashFlowRepository.create(data);
  }

  public async getAll() {
    return this.cashFlowRepository.getAll();
  }

  public async update(id: number, data: UpdateCashFlowDTO) {
    const cashFlow = await this.cashFlowRepository.findOne(id);

    if (!cashFlow) throw new NotFoundException();

    return this.cashFlowRepository.update(id, data);
  }

  public async delete(id: number) {
    const cashFlow = await this.cashFlowRepository.findOne(id);

    if (!cashFlow) throw new NotFoundException();

    return this.cashFlowRepository.delete(id);
  }
}
