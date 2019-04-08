import { Service } from 'typedi'
import asyncRedis from 'async-redis'
import { NotFoundError, BadRequestError, InternalServerError } from 'routing-controllers'

import { STORAGE_NAME } from '../../config/env.config'
import { Transaction } from '../models/transaction.model'
import { TransactionBody } from '../models/transactionBody.model'
import logger from '../../config/winston.config'
import { TransactionType } from '../models/transaction.enum'

@Service()
export class TransactionService {
  private readonly client
  private readonly storageName!: string

  constructor() {
    this.storageName = STORAGE_NAME
    this.client = asyncRedis.createClient()
    this.client.on('connect', () => {
      logger.debug('Redis connected')
    })
  }

  public async findAllTransactions(): Promise<Transaction[]> {
    const redisResponse: object | null = await this.client.hgetall(this.storageName)
    if (!redisResponse) {
      throw new InternalServerError('Cannot find transactions history')
    }
    return Object.values(redisResponse).map((value: string) => {
      const result = JSON.parse(value)
      return {
        ...result,
        amount: parseFloat(result.amount)
      }
    })
  }

  public async findTransactionById(id: string): Promise<Transaction> {
    if (!id) {
      throw new BadRequestError('Transaction id is wrong')
    }
    const transaction: Transaction = JSON.parse((await this.client.hmget(this.storageName, id))[0])
    if (!transaction) {
      throw new NotFoundError(`Transaction was not found by id "${id}"`)
    }
    console.log(transaction)
    return transaction
  }

  public async createTransaction(data: TransactionBody): Promise<Transaction> {
    if ((!data.type && !data.amount) || data.amount < 0) {
      throw new BadRequestError('Cannot process wrong request')
    }
    const transaction = new Transaction(data.type, data.amount)
    try {
      await this.client.hmset(this.storageName, [transaction.id, JSON.stringify(transaction)])
    } catch (err) {
      throw new InternalServerError(`Cannot commit transaction. Reason: ${err.message}`)
    }
    return this.findTransactionById(transaction.id)
  }
}
