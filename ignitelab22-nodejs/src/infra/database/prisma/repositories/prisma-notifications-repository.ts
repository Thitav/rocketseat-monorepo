import { Injectable } from '@nestjs/common'
import { Notification } from '../../../../app/entities/notification'
import { NotificationsRepository } from '../../../../app/repositories/notifications-repository'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  private prismaService: PrismaService

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
        readAt: notification.readAt,
        createdAt: notification.createdAt
      }
    })
  }
}
