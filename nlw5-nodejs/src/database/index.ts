import { createConnection } from 'typeorm'

createConnection().catch((err) => {
  console.error(err)
})
