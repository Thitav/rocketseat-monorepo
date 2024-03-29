import { Controller, Body, Post } from '@nestjs/common'
import { SendNotification } from '../../../app/services/send-notification'
import { CreateNotificationBody } from '../dtos/create-notification-body'

@Controller('notifications')
export class NotificationsController {
  private sendNotification: SendNotification

  constructor(sendNotification: SendNotification) {
    this.sendNotification = sendNotification
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return { notification }
  }
}
