import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'

io.on('connect', async (socket) => {
  const connectionsService = new ConnectionsService()
  const messagesService = new MessagesService()

  const connectionsWithoutAdmin = await connectionsService.findWithoutAdmin()

  io.emit('admin_list_all_users', connectionsWithoutAdmin)

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { userId } = params

    const messages = await messagesService.listByUser(userId)

    callback(messages)
  })

  socket.on('admin_send_message', async (params) => {
    const { userId, text } = params

    await messagesService.create({
      adminId: socket.id,
      userId,
      text
    })

    const { socketId } = await connectionsService.findByUserId(userId)

    io.to(socketId).emit('admin_send_to_client', {
      socketId: socket.id,
      text
    })
  })
})
