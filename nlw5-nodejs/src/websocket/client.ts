import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsService'
import { UsersService } from '../services/UsersService'
import { MessagesService } from '../services/MessagesService'

interface IParams {
  email: string
  text: string
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService()
  const usersService = new UsersService()
  const messagesService = new MessagesService()

  socket.on('client_first_access', async ({ email, text }: IParams) => {
    let userId = null
    const socketId = socket.id

    const userExists = await usersService.findByEmail(email)
    if (!userExists) {
      const user = await usersService.create(email)
      userId = user.id

      await connectionsService.create({
        userId,
        socketId
      })
    } else {
      userId = userExists.id

      const connection = await connectionsService.findByUserId(userId)
      if (connection) {
        connection.socketId = socketId
        await connectionsService.create(connection)
      } else {
        await connectionsService.create({
          userId,
          socketId
        })
      }
    }

    await messagesService.create({ userId, text })

    const messages = await messagesService.listByUser(userId)

    socket.emit('client_list_all_messages', messages)
  })

  socket.on('client_send_to_admin', async (params) => {
    const { socketId, text } = params
    const { userId } = await connectionsService.findBySocketId(socket.id)

    const message = await messagesService.create({
      userId,
      text
    })

    io.to(socketId).emit('admin_receive_from_client', {
      userId: userId,
      message
    })
  })
})
