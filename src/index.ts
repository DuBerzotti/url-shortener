import express, {Request, Response} from 'express'
import { MongoConnection } from './database/MongoConnection'

import { URLController } from './controller/URLController'
import { UserController } from './controller/UserController'

const authMiddleware = require('./middlewares/auth')
const router = express.Router()

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new URLController()
const userController = new UserController()

api.post('/shorten' , authMiddleware, urlController.shorten)
api.post('/register', authMiddleware, userController.newUser)
api.post('/authenticate', userController.AutenticateUser)

api.get('/:hash', urlController.redirect)

api.listen(5000, () => console.log('Express Listening'))