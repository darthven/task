import 'reflect-metadata'
import request from 'request-promise-native'

import { NODE_ENV, PORT } from './config/env.config'
import logger from './config/winston.config'
import server from './api/server'
import storage from './storage'

server.listen(
	PORT,
	async (): Promise<void> => {
		await storage()
		logger.debug(`HTTP Server listening on port: ${PORT}`)
		logger.debug(`Environment: ${NODE_ENV}`)
	}
)
