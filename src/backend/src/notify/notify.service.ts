import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import fs from 'fs/promises';
import path from 'path';

export interface NotifyUser {
  id: number;
  name: string;
  phoneNumber: string;
}

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);
  private readonly twilioClient: Twilio;
  private readonly fromNumber: string | undefined;
  private readonly notifyUsersPath: string;

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.fromNumber = this.configService.get<string>('TWILIO_FROM_NUMBER');

    if (!accountSid || !authToken || !this.fromNumber) {
      console.log(accountSid, authToken, this.fromNumber);
      throw new Error(`Missing configuration ${accountSid} ${authToken} ${this.fromNumber}`);
    }
    this.twilioClient = new Twilio(accountSid, authToken);

    this.notifyUsersPath = path.resolve('./src/users.json');
  }

  private async readNotifyUsers(): Promise<NotifyUser[]> {
    const data = await fs.readFile(this.notifyUsersPath, 'utf-8');
    return JSON.parse(data) as NotifyUser[];
  }

  async getNotifyUsers(): Promise<NotifyUser[]> {
    try {
      return await this.readNotifyUsers();
    } catch (error) {
      this.logger.error(
        'Failed to read notification users file',
        error instanceof Error ? error.stack : undefined,
      );
      throw new InternalServerErrorException('Failed to read notification users');
    }
  }

  async sendNotifications(pendingUserIds: number[]) {
    if (!this.twilioClient || !this.fromNumber) {
      throw new InternalServerErrorException('Twilio is not configured.');
    }

    const notifyUsers = await this.readNotifyUsers();
    const pendingUsers = notifyUsers.filter((user) => pendingUserIds.includes(user.id));

    if (!pendingUsers.length) {
      this.logger.log('No users selected for notification. Skipping SMS send.');
      return;
    }

    const template = this.buildMessage(pendingUsers);
    console.log(template);

    try {
      await Promise.all(
        notifyUsers.map((user) =>
          this.twilioClient.messages.create({
            body: template,
            from: this.fromNumber,
            to: user.phoneNumber,
          }),
        ),
      );
      this.logger.log(
        `Notification sent to ${notifyUsers.length} recipients about ${pendingUsers.length} pending players.`,
      );
    } catch (error) {
      this.logger.error('Failed to send some notifications', { error });
      throw new InternalServerErrorException('Failed to send notifications');
    }
  }

  private buildMessage(pendingUsers: NotifyUser[]): string {
    const userList = pendingUsers.map((user) => `• ${user.name}`).join('\n');
    return `🏈 Dynasty update:\nThe following players still need to ready up:\n${userList}`;
  }
}
