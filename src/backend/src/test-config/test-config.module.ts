import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestConfigService } from './test-config.service';

@Module({
  imports: [ConfigModule],
  providers: [TestConfigService],
})
export class TestConfigModule {}

