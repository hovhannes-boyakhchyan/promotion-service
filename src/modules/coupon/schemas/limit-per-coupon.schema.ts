import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LimitPerCoupon {
  @Prop({ type: Number, default: null, min: 1 })
  maxUse: number;

  @Prop({ type: Number, default: 0, min: 0 })
  usedCount: number;
}

export const LimitPerCouponSchema =
  SchemaFactory.createForClass(LimitPerCoupon);
