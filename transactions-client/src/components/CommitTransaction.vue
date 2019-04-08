<template>
  <v-btn flat @click="visible = true"
    >Commit Transaction
    <v-dialog v-model="visible" max-width="450px">
      <v-card>
        <v-card-title class="headline pixio-card-title" primary-title>Commit transaction</v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-layout>
                <v-flex>
                  <v-text-field name="amount" label="Amount" type="text" v-model="amount"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select v-model="type" :items="transactionTypes" label="Type"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-btn color="primary" flat @click="commit">Process</v-btn>
          <v-btn color="primary" flat @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
import { TRANSACTION_TYPES } from './../config/env.config'
import { COMMIT_TRANSACTION_REQUEST } from '../store/actions/transaction'
import { GET_ACCOUNT_BALANCE_REQUEST } from '../store/actions/account'

export default {
  name: 'CommitTransaction',
  data: () => ({
    visible: false,
    transactionTypes: TRANSACTION_TYPES,
    amount: null,
    type: null
  }),
  methods: {
    async commit() {
      const { amount, type } = this
      this.close()
      await this.$store.dispatch(COMMIT_TRANSACTION_REQUEST, {
        amount,
        type: type.toLowerCase()
      })
      await this.$store.dispatch(GET_ACCOUNT_BALANCE_REQUEST)
    },
    close() {
      this.visible = false
      this.amount = null
      this.type = null
    }
  }
}
</script>
