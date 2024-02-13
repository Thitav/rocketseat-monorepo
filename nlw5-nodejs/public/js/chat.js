/* eslint-disable no-undef */

let socketAdminId = null
let email = null

document.querySelector('#start_chat').addEventListener('click', (event) => {
  const socket = io()

  const chatHelp = document.getElementById('chat_help')
  chatHelp.style.display = 'none'

  const chatInSupport = document.getElementById('chat_in_support')
  chatInSupport.style.display = 'block'

  email = document.getElementById('email').value
  const text = document.getElementById('txt_help').value

  const params = { email, text }

  socket.on('connect', () => {
    socket.emit('client_first_access', params, (call, err) => {
      if (err) {
        console.error(err)
      } else {
        console.log(call)
      }
    })
  })

  socket.on('client_list_all_messages', (messages) => {
    const templateClient = document.getElementById('message-user-template').innerHTML
    const templateAdmin = document.getElementById('admin-template').innerHTML

    let rendered = null

    messages.forEach((message) => {
      if (message.adminId === null) {
        rendered = Mustache.render(templateClient, {
          message: message.text,
          email
        })
      } else {
        rendered = Mustache.render(templateAdmin, {
          message_admin: message.text
        })
      }

      document.getElementById('messages').innerHTML += rendered
    })
  })

  socket.on('admin_send_to_client', (params) => {
    const { socketId, text } = params

    socketAdminId = socketId

    const templateAdmin = document.getElementById('admin-template').innerHTML
    const rendered = Mustache.render(templateAdmin, {
      message_admin: text
    })

    document.getElementById('messages').innerHTML += rendered
  })

  document.querySelector('#send_message_button').addEventListener('click', (event) => {
    const text = document.getElementById('message_user').value

    const params = {
      socketId: socketAdminId,
      text
    }

    socket.emit('client_send_to_admin', params)

    const templateClient = document.getElementById('message-user-template').innerHTML
    const rendered = Mustache.render(templateClient, {
      message: text,
      email: email
    })

    document.getElementById('messages').innerHTML += rendered
  })
})
