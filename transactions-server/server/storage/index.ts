import 'reflect-metadata'

import logger from '../config/winston.config'
import Container from 'typedi'
import { TransactionService } from '../api/services/transaction.service'
import { seedTransactions } from './seed';


export default async (): Promise<void> => {
	try {
        const service = new TransactionService()
        Container.set('transactionService', service)
        await seedTransactions()
		logger.debug('Connection to redis was successful')
	} catch (err) {
		logger.error('Cannot connect to redis: ', err)
	}
}
