import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslatorModule } from 'nestjs-translator';
import * as Joi from 'joi';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),

    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),

    TranslatorModule.forRoot({
      global: true,
      defaultLang: 'fa',
    }),

    UserModule,
  ],
})
export class AppModule {}
