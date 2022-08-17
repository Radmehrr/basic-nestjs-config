import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSimcartController } from 'src/admin/admin-simcart.controller';
import { UserModule } from 'src/user/user.module';
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
