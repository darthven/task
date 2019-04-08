import 'reflect-metadata'

import { TransactionType } from '../api/models/transaction.enum'
import { TransactionService } from '../api/services/transaction.service'
import Container from 'typedi'
import { Transaction } from '../api/models/transaction.model'

export const seedTransactions = async (): Promise<void> => {
  const service: TransactionService = Container.get(TransactionService)
  const transactions: Transaction[] = await service.findAllTransactions()
  if (transactions.length === 0) {
    await service.createTransaction({
      type: TransactionType.DEBIT,
      amount: 100
    })
    await service.createTransaction({
      type: TransactionType.CREDIT,
      amount: 56
    })
  }
}
