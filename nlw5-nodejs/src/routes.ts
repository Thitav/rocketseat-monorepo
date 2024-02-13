import { Router } from 'express'
import { MessagesController } from './controllers/MessagesController'
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from './controllers/UsersController'

const router = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()

router.get('/', (req, res) => {
  return res.json({ status: 'running' })
})
router.get('/pages/client', (req, res) => {
  return res.render('html/client.html')
})
router.get('/pages/admin', (req, res) => {
  return res.render('html/admin.html')
})

router.post('/settings', settingsController.create)
router.get('/settings/:username', settingsController.findByUsername)
router.put('/settings/:username', settingsController.update)

router.post('/users', usersController.create)

router.post('/messages', messagesController.create)
router.get('/messages/:userId', messagesController.showByUser)

export { router }
