import { getCustomRepository, Repository } from 'typeorm'
import { Setting } from '../entities/Setting'
import { SettingsRepository } from '../repositories/SettingsRepository'

interface ISettingCreate {
  chat: boolean
  username: string
}

class SettingsService {
  private repository: Repository<Setting>

  constructor () {
    this.repository = getCustomRepository(SettingsRepository)
  }

  async create ({ chat, username } : ISettingCreate) {
    const userExists = await this.repository.findOne({ username })
    if (userExists) {
      throw new Error('user already exists')
    }

    const settings = this.repository.create({
      chat,
      username
    })
    await this.repository.save(settings)

    return settings
  }

  async findByUsername (username: string) {
    const settings = await this.repository.findOne({ username })

    return settings
  }

  async update ({ chat, username } : ISettingCreate) {
    const setting = await this.repository.findOne({ username })

    setting.chat = chat
    const settings = await this.repository.create(setting)
    await this.repository.save(settings)

    return settings
  }
}

export { SettingsService }
