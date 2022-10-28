import { IsNumber, IsOptional, Min } from 'class-validator';

export class limitPerCouponDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  readonly maxUse: number;
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly usedCount: number;
}
