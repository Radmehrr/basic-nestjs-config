import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ type: String })
  province: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  text: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
