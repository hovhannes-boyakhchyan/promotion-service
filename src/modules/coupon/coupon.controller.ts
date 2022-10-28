import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { CreateCouponDto, UpdateCouponDto, ValidateCouponDto } from './dto';
import { CouponService } from './coupon.service';
import { Coupon, CouponDocument } from './schemas';
import { ValidationMongoIdPipe } from '../../common/pipes/validation-mongoId.pipe';

@ApiTags('Coupon')
@Controller('promotion')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('/coupon-create')
  @ApiOperation({ summary: 'Create Coupon' })
  @ApiResponse({
    status: 200,
    description: 'The Coupon created',
    type: Coupon,
  })
  async createCoupon(
    @Body() createCouponDto: CreateCouponDto,
  ): Promise<CouponDocument> {
    return this.couponService.createCoupon(createCouponDto);
  }

  @Get('/coupon-get/:id')
  async getCouponById(
    @Param('id', ValidationMongoIdPipe) couponId: string,
  ): Promise<CouponDocument> {
    return this.couponService.getCouponById(couponId);
  }

  @Post('/coupons-get')
  async getCoupons(
    @Body() getCouponsFilter: FilterQuery<CouponDocument>,
  ): Promise<CouponDocument[]> {
    let query: FilterQuery<CouponDocument> = {};

    if (getCouponsFilter.active) {
      query = { ...getCouponsFilter, endDate: { $gte: new Date() } };
    } else if (getCouponsFilter.active === false) {
      delete getCouponsFilter.active;
      query['$and'] = [
        { ...getCouponsFilter },
        { $or: [{ active: false }, { endDate: { $lte: new Date() } }] },
      ];
    } else {
      query = getCouponsFilter;
    }

    return this.couponService.getCoupons(query);
  }

  @Patch('/coupon-update/:id')
  async updateCoupon(
    @Param('id', ValidationMongoIdPipe) couponId: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ): Promise<CouponDocument> {
    return this.couponService.updateCoupon(couponId, updateCouponDto);
  }

  @Delete('/coupon-delete/:id')
  async deleteCoupon(@Param('id', ValidationMongoIdPipe) couponId: string) {
    await this.couponService.deleteCoupon(couponId);
    return {};
  }

  @Post('/coupon-validate')
  async validateCoupon(
    @Body() validateCouponDto: ValidateCouponDto,
  ): Promise<CouponDocument> {
    return this.couponService.validateCoupon(validateCouponDto);
  }
}
