import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';
import { CreateCashFlowDTO } from './dto/create-cash-flow.dto';
import { UpdateCashFlowDTO } from './dto/update-cash-flow.dto';

@Controller('cash-flow')
export class CashFlowController {
  constructor(private readonly cashFlowService: CashFlowService) {}

  @Get()
  public async findAll() {
    return this.cashFlowService.getAll();
  }

  @Post()
  public async create(@Body() data: CreateCashFlowDTO) {
    return this.cashFlowService.create(data);
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateCashFlowDTO,
  ) {
    return this.cashFlowService.update(Number(id), body);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    return this.cashFlowService.delete(Number(id));
  }
}
