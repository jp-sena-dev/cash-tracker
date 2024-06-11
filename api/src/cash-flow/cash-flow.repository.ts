import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { CreateCashFlowDTO } from './dto/create-cash-flow.dto';
import { CashFlowEntity } from './entities/cash-flow.entity';
import { UpdateCashFlowDTO } from './dto/update-cash-flow.dto';

@Injectable()
export class CashFlowRepository {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(data: CreateCashFlowDTO): Promise<CashFlowEntity> {
    const created = await this._prisma.cashFlow.create({
      data: {
        name: data.name,
        value: data.value,
        description: data.description,
        type: data.type,
      },
    });

    return created;
  }

  public async getAll(): Promise<CashFlowEntity[]> {
    return this._prisma.cashFlow.findMany();
  }

  public async findOne(id: number): Promise<CashFlowEntity> {
    return this._prisma.cashFlow.findFirst({ where: { id } });
  }

  public async update(
    id: number,
    data: UpdateCashFlowDTO,
  ): Promise<CashFlowEntity> {
    return this._prisma.cashFlow.update({ where: { id }, data });
  }

  public async delete(id: number) {
    return this._prisma.cashFlow.delete({ where: { id } });
  }
}
