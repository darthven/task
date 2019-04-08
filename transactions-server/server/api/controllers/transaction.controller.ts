import { JsonController, Get, HttpCode, Param, Post, Body } from 'routing-controllers'
import { Inject } from 'typedi'

import { TransactionService } from '../services/transaction.service'
import { Transaction } from '../models/transaction.model'
import { TransactionBody } from '../models/transactionBody.model'

@JsonController('/transactions')
export class TransactionController {
  @Inject()
  private readonly service!: TransactionService

  @HttpCode(200)
  @Get()
  public async getTransactionsHistory(): Promise<Transaction[]> {
    return this.service.findAllTransactions()
  }

  @HttpCode(200)
  @Get('/:transactionId')
  public async getTransaction(@Param('transactionId') id: string): Promise<Transaction> {
    return this.service.findTransactionById(id)
  }

  @HttpCode(201)
  @Post()
  public async commitTransaction(@Body() request: TransactionBody): Promise<Transaction> {
    return this.service.createTransaction(request)
  }
}
