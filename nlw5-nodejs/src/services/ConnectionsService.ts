import { getCustomRepository, Repository } from 'typeorm'
import { Connection } from '../entities/Connection'
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'

interface IConnectionCreate {
  id?: string
  adminId?: string
  userId: string
  socketId: string
}

class ConnectionsService {
  private repository: Repository<Connection>

  constructor () {
    this.repository = getCustomRepository(ConnectionsRepository)
  }

  async create ({ id, adminId, userId, socketId } : IConnectionCreate) {
    const connection = this.repository.create({
      id,
      adminId,
      userId,
      socketId
    })
    await this.repository.save(connection)

    return connection
  }

  async findByUserId (userId: string) {
    const connection = this.repository.findOne({ userId })

    return connection
  }

  async findWithoutAdmin () {
    const connections = await this.repository.find({
      where: {
        adminId: null
      },
      relations: ['user']
    })

    return connections
  }

  async findBySocketId (socketId: string) {
    const connection = await this.repository.findOne({
      socketId
    })

    return connection
  }
}

export { ConnectionsService }
