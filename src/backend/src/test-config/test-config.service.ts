import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TestConfigService {
  private readonly logger = new Logger(TestConfigService.name);

  constructor(private readonly configService: ConfigService) {
    const value = this.configService.get<string>('TEST_VALUE');
    this.logger.log(`TEST_VALUE: ${value ?? 'undefined'}`);
    console.log(`TEST_VALUE: ${value ?? 'undefined'}`);
  }
}
