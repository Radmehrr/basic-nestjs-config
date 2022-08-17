import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateSimcartDto } from './dto/create-simcart.dto';
import { UpdateSimcartDto } from './dto/update-simcart.dto';
import { Simcart, SimcartDocument } from './models/simcart.schema';

@Injectable()
export class SimcartService {
  constructor(
    @InjectModel(Simcart.name)
    private readonly simcartModel: Model<SimcartDocument>,
  ) {}

  async createSimcart(
    createSimcartDto: CreateSimcartDto,
  ): Promise<SimcartDocument> {
    const simcart = await this.simcartModel.create(createSimcartDto);
    return simcart;
  }

  async findOne(filterQuery: FilterQuery<SimcartDocument>) {
    return await this.simcartModel.findOne(filterQuery);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<SimcartDocument>,
    updateSimcartDto: UpdateSimcartDto,
  ): Promise<SimcartDocument> {
    return await this.simcartModel.findOneAndUpdate(
      filterQuery,
      updateSimcartDto,
      {
        new: true,
      },
    );
  }
}
