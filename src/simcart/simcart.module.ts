import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { AdminSimcartController } from './admin-simcart.controller';
import { Simcart, SimcartSchema } from './models/simcart.schema';
import { SimcartService } from './simcart.service';
import { UserSimcartController } from './user-simcart.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Simcart.name, schema: SimcartSchema }]),
    UserModule,
  ],
  providers: [SimcartService],
  controllers: [AdminSimcartController, UserSimcartController],
  exports: [SimcartService],
})
export class SimcartModule {}
