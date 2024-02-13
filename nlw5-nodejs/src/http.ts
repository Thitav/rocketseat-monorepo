import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { router } from './routes'
import path from 'path'
import './database'

const app = express()
const http = createServer(app)
const io = new Server(http)

const pub = path.join(__dirname, '..', 'public')

app.engine('html', require('ejs').renderFile)
app.use(express.static(pub))
app.set('views', pub)
app.set('view engine', 'html')

app.use(express.json())
app.use(router)

export { http, io }
