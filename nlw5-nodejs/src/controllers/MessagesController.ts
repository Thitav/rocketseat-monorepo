import { Request, Response } from 'express'
import { MessagesService } from '../services/MessagesService'

class MessagesController {
  async create (req: Request, res: Response) {
    const { adminId, userId, text } = req.body

    const messagesService = new MessagesService()
    const message = await messagesService.create({ adminId, userId, text })

    return res.json(message)
  }

  async showByUser (req: Request, res: Response) {
    const { userId } = req.params

    const messagesService = new MessagesService()

    const list = await messagesService.listByUser(userId)

    return res.json(list)
  }
}

export { MessagesController }
