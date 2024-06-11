import { Module } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';
import { CashFlowController } from './cash-flow.controller';
import { CashFlowRepository } from './cash-flow.repository';

@Module({
  imports: [],
  controllers: [CashFlowController],
  providers: [CashFlowService, CashFlowRepository],
})
export class CashFlowModule {}
