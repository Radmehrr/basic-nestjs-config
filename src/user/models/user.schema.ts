import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { UserRole } from '../enum/user-role.enum';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ type: String })
  ip: string;

  @Prop({ type: String })
  fullName: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Prop({ type: Boolean, default: false })
  access: boolean;

  @Prop({ type: Number })
  code: number;

  @Prop({ type: Number, default: now() })
  createdAt: number;

  @Prop({ type: Number, default: now() })
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
