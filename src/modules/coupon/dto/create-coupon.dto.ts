import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
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

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  readonly couponCode: string;
  @IsNotEmpty()
  @IsString()
  readonly couponName: string;
  @IsNotEmpty()
  @IsString()
  readonly couponTitle: string;
  @IsBoolean()
  @IsOptional()
  readonly active: boolean;
  @IsDateString()
  @IsFutureDate()
  readonly startDate: string;
  @IsDateString()
  @IsFutureDate()
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
  readonly freeDelivery: boolean;
  @IsNotEmpty()
  @IsMongoId()
  readonly business: ObjectId;
}
