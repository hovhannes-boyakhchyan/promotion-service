import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Coupon } from './coupon.schema';

export type CustomerInfoDocument = CustomerInfo & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
})
export class CustomerInfo {
  @Prop({ auto: true })
  @ApiProperty({ example: '635920bad95ec1521476035d' })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @ApiProperty({
    example: 'customerId',
  })
  customer: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' })
  @ApiProperty({ example: 'couponId' })
  coupon: Coupon;

  @Prop({ default: 0, min: 0 })
  @ApiProperty({ example: '7' })
  usedCount: number;
}

export const CustomerInfoSchema = SchemaFactory.createForClass(CustomerInfo);
