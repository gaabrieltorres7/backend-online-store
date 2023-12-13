import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from './modules/cache/cache.module';
import { CategoryModule } from './modules/category/category.module';
import { CityModule } from './modules/city/city.module';
import { RolesGuard } from './modules/guards/roles.guard';
// import { ProductModule } from './modules/product/product.module';
import { StateModule } from './modules/state/state.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    CategoryModule,
    // ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
