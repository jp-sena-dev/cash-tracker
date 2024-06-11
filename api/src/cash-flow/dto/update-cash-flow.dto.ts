import { PartialType } from '@nestjs/mapped-types';
import { CreateCashFlowDTO } from './create-cash-flow.dto';

export class UpdateCashFlowDTO extends PartialType(CreateCashFlowDTO) {}
