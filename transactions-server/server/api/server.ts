import 'reflect-metadata'
import { useKoaServer, useContainer } from 'routing-controllers'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-body'
import Container from 'typedi'

import { LoggingMiddleware } from '../middlewares/loggingMiddleware'
import { API_VERSION } from '../config/env.config'
import { TransactionController } from './controllers/transaction.controller'
import { AccountController } from './controllers/account.controller'

useContainer(Container)

const app = new Koa()
const controllers = [TransactionController, AccountController]
const middlewares = [LoggingMiddleware]

app.use(
	bodyParser({
		jsonLimit: '10mb',
		urlencoded: true,
		multipart: true
	})
).use(cors())

export default useKoaServer(app, {
	routePrefix: `/api/${API_VERSION}`,
	controllers,
	middlewares,
	defaultErrorHandler: false,
	classTransformer: false
})
