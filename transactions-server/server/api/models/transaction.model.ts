import { generate } from 'randomstring'

import { TransactionType } from './transaction.enum'

export class Transaction {
  public id!: string
  public type!: TransactionType
  public amount!: number
  public effectiveDate!: string

  constructor(type, amount) {
    this.id = generate()
    this.type = type
    this.amount = amount
    this.effectiveDate = new Date().toISOString()
  }
}
