import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '../../.env'),
    }),
    NotifyModule,
  ],
})
export class AppModule {}
