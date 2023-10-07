import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { CityModule } from './modules/city/city.module';
import { StateModule } from './modules/state/state.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, StateModule, CityModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
