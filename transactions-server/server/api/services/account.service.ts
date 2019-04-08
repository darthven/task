import { Service, Inject } from 'typedi'
import { TransactionService } from './transaction.service'

import { Transaction } from '../models/transaction.model'
import { TransactionType } from '../models/transaction.enum'
import { Balance } from '../models/balance.model'

@Service()
export class AccountService {
  @Inject()
  private readonly transactionService!: TransactionService

  public async fetchAccountBalance(): Promise<Balance> {
    const transactions: Transaction[] = await this.transactionService.findAllTransactions()
    console.log(transactions)
    return {
      total:
        this.countAmount(transactions, TransactionType.DEBIT) - this.countAmount(transactions, TransactionType.CREDIT)
    }
  }

  private countAmount(transactions: Transaction[], type: TransactionType): number {
    const filteredTransactions: Transaction[] = transactions.filter(transaction => transaction.type === type)
    if (filteredTransactions.length === 0) {
      return 0
    }
    return filteredTransactions.map(transaction => transaction.amount).reduce((amount1, amount2) => amount1 + amount2)
  }
}
