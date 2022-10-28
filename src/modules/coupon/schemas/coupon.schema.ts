import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';
import {
  LimitPerCoupon,
  LimitPerCouponSchema,
} from './limit-per-coupon.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { COUPON_IS_ALREADY_EXIST } from 'src/common/constants';

export type CouponDocument = Coupon & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
})
export class Coupon {
  @Prop({ auto: true })
  @ApiProperty({ example: '635920bad95ec1521476035d' })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, minLength: 4 })
  @ApiProperty({
    example: 'I1521476035D',
    description: 'Min 4 character, Required field',
  })
  couponCode: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'Coupon Name, Required field' })
  couponName: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'Coupon title, Required field' })
  couponTitle: string;

  @Prop({ default: true })
  @ApiProperty({ example: 'true' })
  active: boolean;

  @Prop({ required: true })
  @ApiProperty({
    example: '2022-10-28T07:21:54.885Z',
    description: 'Can’t be a time from the past, Required field',
  })
  startDate: Date;

  @Prop({ required: true })
  @ApiProperty({
    example: '2022-10-28T07:21:54.885Z',
    description: 'Can’t be a time from the past, Required field',
  })
  endDate: Date;

  @Prop({ min: 0, default: 0 })
  @ApiProperty({ example: '5' })
  amount: number;

  @Prop({ min: 0, default: 0 })
  @ApiProperty({ example: '10' })
  percent: number;

  @Prop({ min: 1, default: 1 })
  @ApiProperty({ example: '20' })
  usePerCustomer: number;

  @Prop({
    type: LimitPerCouponSchema,
    _id: false,
    default: new LimitPerCoupon(),
  })
  @ApiProperty({ example: { maxUse: 10, usedCount: 0 } })
  limitPerCoupon: LimitPerCoupon;

  @Prop({ default: false })
  @ApiProperty({ example: 'true' })
  freeDelivery: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @ApiProperty({ example: 'businessId' })
  business: mongoose.Schema.Types.ObjectId;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

CouponSchema.post('find', function (coupons) {
  for (const coupon of coupons) {
    if (coupon.active && moment(coupon.endDate).isBefore()) {
      coupon.active = false;
      coupon.save();
    }
  }
  return coupons;
});
