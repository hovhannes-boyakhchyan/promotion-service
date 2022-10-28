import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Min,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Type } from 'class-transformer';
import { limitPerCouponDto } from '../dto';
import { IsFutureDate } from '../../../common/decorators';

export class UpdateCouponDto {
  @IsString()
  @Length(4)
  @IsOptional()
  readonly couponCode: string;
  @IsString()
  @IsOptional()
  readonly couponName: string;
  @IsString()
  @IsOptional()
  readonly couponTitle: string;
  @IsBoolean()
  @IsOptional()
  readonly active: boolean;
  @IsDateString()
  @IsFutureDate()
  @IsOptional()
  readonly startDate: string;
  @IsDateString()
  @IsFutureDate()
  @IsOptional()
  readonly endDate: string;
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly amount: number;
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly percent: number;
  @IsNumber()
  @Min(1)
  @IsOptional()
  readonly usePerCustomer: number;
  @Type(() => limitPerCouponDto)
  @ValidateNested()
  readonly limitPerCoupon?: limitPerCouponDto;
  @IsBoolean()
  @IsOptional()
  readonly freeDelivery: boolean;
  @IsMongoId()
  @IsOptional()
  readonly business: ObjectId;
}
