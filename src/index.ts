import express, {Request, Response} from 'express'
import { URLController } from './controller/URLController'
import { UserController } from './controller/UserController'
import { MongoConnection } from './database/MongoConnection'

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new URLController()
const userController = new UserController()

api.post('/shorten', urlController.shorten)
api.post('/register', userController.newUser)

api.get('/:hash', urlController.redirect)

api.listen(5000, () => console.log('Express Listening'))