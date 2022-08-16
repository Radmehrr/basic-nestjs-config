import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SimCategory } from '../enum/category.enum';
import { SimStatus } from '../enum/status.enum';
import { SimType } from '../enum/type.enum';

export type SimcartDocument = Simcart & Document;

@Schema({ collection: 'simcart' })
export class Simcart {
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, enum: Object.values(SimCategory), required: true })
  category: SimCategory;

  @Prop({ type: String, enum: Object.values(SimStatus), required: true })
  status: SimStatus;

  @Prop({ type: String, enum: Object.values(SimType), required: true })
  type: SimType;
}

export const SimcartSchema = SchemaFactory.createForClass(Simcart);
