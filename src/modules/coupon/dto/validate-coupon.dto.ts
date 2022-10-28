import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

export class ValidateCouponDto {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  readonly couponCode: string;
  @IsNotEmpty()
  @IsMongoId()
  readonly business: ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: ObjectId;
}
