<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item, index) in transactions" :key="index">
      <template v-slot:header>
        <v-container fluid>
          <v-layout fluid>
            <v-flex grow>
              <h3>Transaction ID:</h3>
              {{ item.id }}
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex shrink>
              <v-chip :class="item.type">
                {{ item.type }}
              </v-chip>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
      <v-card>
        <v-container>
          <v-layout fluid>
            <v-flex fluid>
              <v-card-text>Amount: {{ item.amount }}</v-card-text>
            </v-flex>
            <v-flex>
              <v-card-text>Date: {{ item.effectiveDate }}</v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import moment from 'moment'

import { GET_TRANSACTIONS_HISTORY_REQUEST } from './../store/actions/transaction'

export default {
  name: 'TransactionList',
  async created() {
    this.$store.dispatch(GET_TRANSACTIONS_HISTORY_REQUEST)
  },
  computed: {
    transactions() {
      return this.$store.getters.transactions
        .map(item => {
          return {
            ...item,
            effectiveDate: moment(item.effectiveDate).format('MMMM Do YYYY, h:mm:ss a')
          }
        })
        .sort((a, b) => {
          if (a.effectiveDate < b.effectiveDate) {
            return 1
          }
          return -1
        })
    }
  }
}
</script>

<style scoped>
.debit {
  background-color: lightgreen;
}

.credit {
  background-color: lightblue;
}
</style>
