import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponModule } from './modules/coupon/coupon.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${
        process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production'
          ? 'production'
          : 'development'
      }.env`,
      load: [databaseConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    CouponModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
