import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import {
  Coupon,
  CouponDocument,
  CustomerInfo,
  CustomerInfoDocument,
} from './schemas';
import { CreateCouponDto, UpdateCouponDto, ValidateCouponDto } from './dto';
import {
  COUPON_IS_ALREADY_EXIST,
  COUPON_NOT_FOUND,
  COUPON_IS_EXPIRED,
} from '../../common/constants';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name)
    private readonly couponModel: Model<CouponDocument>,
    @InjectModel(CustomerInfo.name)
    private readonly customerInfoModel: Model<CustomerInfoDocument>,
  ) {}

  async createCoupon(
    createCouponDto: CreateCouponDto,
  ): Promise<CouponDocument> {
    await this.uniqueCouponValidation(
      createCouponDto.couponCode,
      createCouponDto.business,
    );
    return this.couponModel.create(createCouponDto);
  }

  async getCouponById(id: string): Promise<CouponDocument> {
    return this.couponModel.findById(id);
  }

  async getCoupons(
    getCouponsFilter: FilterQuery<CouponDocument>,
  ): Promise<CouponDocument[]> {
    return this.couponModel.find({ ...getCouponsFilter });
  }

  async updateCoupon(
    id: string,
    updateCouponDto: UpdateCouponDto,
  ): Promise<CouponDocument> {
    if (updateCouponDto.couponCode || updateCouponDto.business) {
      let business = updateCouponDto.business;
      let couponCode = updateCouponDto.couponCode;
      const currentCoupon = await this.couponModel.findById(id, {
        business: 1,
        couponCode: 1,
      });
      if (!business) {
        business = currentCoupon?.business;
      }
      if (!couponCode) {
        couponCode = currentCoupon?.couponCode;
      }
      await this.uniqueCouponValidation(couponCode, business);
    }

    const updatedCoupon = await this.couponModel.findOneAndUpdate(
      { _id: id },
      { $set: updateCouponDto },
      { new: true },
    );
    if (!updatedCoupon) {
      throw new BadRequestException(COUPON_NOT_FOUND);
    }
    return updatedCoupon;
  }

  async deleteCoupon(id: string): Promise<any> {
    return this.couponModel.deleteOne({ _id: id });
  }

  async uniqueCouponValidation(
    couponCode: string,
    business: ObjectId,
  ): Promise<any> {
    const isExist = await this.couponModel.exists({
      couponCode,
      business,
    });
    if (isExist) {
      throw new BadRequestException(COUPON_IS_ALREADY_EXIST);
    }
  }

  async validateCoupon(
    validateCouponDto: ValidateCouponDto,
  ): Promise<CouponDocument> {
    const coupon = await this.couponModel.findOne({
      couponCode: validateCouponDto.couponCode,
      business: validateCouponDto.business,
    });
    if (!coupon) {
      throw new BadRequestException(COUPON_NOT_FOUND);
    }
    if (
      !coupon.active ||
      coupon.limitPerCoupon.maxUse <= coupon.limitPerCoupon.usedCount
    ) {
      throw new BadRequestException(COUPON_IS_EXPIRED);
    }
    const customerInfo = await this.customerInfoModel.findOne({
      customer: validateCouponDto.customer,
      coupon: coupon._id,
    });
    if (customerInfo?.usedCount >= coupon.usePerCustomer) {
      throw new BadRequestException(COUPON_IS_EXPIRED);
    }
    return coupon;
  }
}
