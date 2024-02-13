/* eslint-disable no-undef */
const socket = io()
let connectionsUsers = []

socket.on('admin_list_all_users', (connections) => {
  connectionsUsers = connections
  document.getElementById('list_users').innerHTML = ''

  const template = document.getElementById('template').innerHTML

  connections.forEach((connection) => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socketId
    })

    document.getElementById('list_users').innerHTML += rendered
  })
})

// eslint-disable-next-line no-unused-vars
function call (id) {
  const connection = connectionsUsers.find(connection => connection.socketId === id)

  const template = document.getElementById('admin_template').innerHTML
  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.userId
  })

  document.getElementById('supports').innerHTML += rendered

  const params = {
    userId: connection.userId
  }

  socket.emit('admin_list_messages_by_user', params, (messages) => {
    const divMessages = document.getElementById(`allMessages${connection.userId}`)

    messages.forEach(message => {
      const createDiv = document.createElement('div')

      if (!message.adminId) {
        createDiv.className = 'admin_message_client'

        createDiv.innerHTML = `<span>${connection.user.email}</span>`
        createDiv.innerHTML += `<span>${message.text}</span>`
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>`
      } else {
        createDiv.className = 'admin_message_admin'

        createDiv.innerHTML = `Atendente: <span>${message.text}</span>`
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>`
      }

      divMessages.appendChild(createDiv)
    })
  })
}

// eslint-disable-next-line no-unused-vars
function sendMessage (id) {
  const text = document.getElementById(`send_message_${id}`)

  const params = {
    userId: id,
    text: text.value
  }

  socket.emit('admin_send_message', params)

  const divMessages = document.getElementById(`allMessages${id}`)
  const createDiv = document.createElement('div')

  createDiv.className = 'admin_message_admin'

  createDiv.innerHTML = `Atendente: <span>${text.value}</span>`
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format('DD/MM/YYYY HH:mm:ss')}</span>`

  divMessages.appendChild(createDiv)
  text.value = ''
}

socket.on('admin_receive_from_client', (params) => {
  const { userId, message } = params

  const connection = connectionsUsers.find(connection => connection.userId === userId)

  const divMessages = document.getElementById(`allMessages${connection.userId}`)
  const createDiv = document.createElement('div')

  createDiv.className = 'admin_message_client'

  createDiv.innerHTML = `<span>${connection.user.email}</span>`
  createDiv.innerHTML += `<span>${message.text}</span>`
  createDiv.innerHTML += `<span class="admin_date">${dayjs(message.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>`

  divMessages.appendChild(createDiv)
})
