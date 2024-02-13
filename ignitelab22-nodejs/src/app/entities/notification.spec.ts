import { Content } from './content'
import { Notification } from './notification'

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'test-recipient-id',
      content: new Content('Test notification'),
      category: 'social'
    })

    expect(notification).toBeTruthy()
  })
})
