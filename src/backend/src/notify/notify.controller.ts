import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get('users')
  getNotifyUsers() {
    return this.notifyService.getNotifyUsers();
  }

  @Post()
  sendNotifications(@Body() { userIds }: SendNotificationDto) {
    return this.notifyService.sendNotifications(userIds ?? []);
  }
}
