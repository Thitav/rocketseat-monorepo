import { getCustomRepository, Repository } from 'typeorm'
import { Message } from '../entities/Message'
import { MessagesRepository } from '../repositories/MessagesRepository'

interface IMessageCreate {
  adminId?: string
  userId: string
  text: string
}

class MessagesService {
  private repository: Repository<Message>

  constructor () {
    this.repository = getCustomRepository(MessagesRepository)
  }

  async create ({ adminId, userId, text } : IMessageCreate) {
    const message = this.repository.create({
      adminId,
      userId,
      text
    })
    await this.repository.save(message)

    return message
  }

  async listByUser (userId: string) {
    const list = await this.repository.find({
      where: { userId },
      relations: ['user']
    })

    return list
  }
}

export { MessagesService }
