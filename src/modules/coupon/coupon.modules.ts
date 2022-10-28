import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Coupon,
  CouponSchema,
  CustomerInfo,
  CustomerInfoSchema,
} from './schemas';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coupon.name, schema: CouponSchema },
      { name: CustomerInfo.name, schema: CustomerInfoSchema },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
