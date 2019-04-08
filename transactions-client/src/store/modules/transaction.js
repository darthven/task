import axios from 'axios'
import {
  GET_TRANSACTIONS_HISTORY_REQUEST,
  GET_TRANSACTIONS_HISTORY_SUCCESS,
  GET_TRANSACTIONS_HISTORY_ERROR,
  COMMIT_TRANSACTION_REQUEST,
  COMMIT_TRANSACTION_SUCCESS,
  COMMIT_TRANSACTION_ERROR
} from '../actions/transaction'

const state = {
  transactions: [],
  status: null,
  error: null
}

const getters = {
  transactions: state => state.transactions,
  debitTransactions: state => state.transactions.filter(transaction => transaction.type === 'debit'),
  creditTransactions: state => state.transactions.filter(transaction => transaction.type === 'credit')
}

const actions = {
  [GET_TRANSACTIONS_HISTORY_REQUEST]: async ({ commit }) => {
    commit(GET_TRANSACTIONS_HISTORY_REQUEST)
    try {
      const response = await axios.get(`/api/v1/transactions`)
      commit(GET_TRANSACTIONS_HISTORY_SUCCESS, response)
    } catch (error) {
      commit(GET_TRANSACTIONS_HISTORY_ERROR, error)
    }
  },
  [COMMIT_TRANSACTION_REQUEST]: async ({ commit }, transactionBody) => {
    commit(GET_TRANSACTIONS_HISTORY_REQUEST)
    try {
      const response = await axios.post(`/api/v1/transactions`, transactionBody)
      commit(COMMIT_TRANSACTION_SUCCESS, response)
    } catch (error) {
      commit(COMMIT_TRANSACTION_ERROR, error)
    }
  }
}

const mutations = {
  [GET_TRANSACTIONS_HISTORY_REQUEST]: state => {
    state.status = 'loading'
  },
  [GET_TRANSACTIONS_HISTORY_SUCCESS]: (state, response) => {
    state.status = 'success'
    console.log(response.data)
    state.transactions = response.data
  },
  [GET_TRANSACTIONS_HISTORY_ERROR]: (state, error) => {
    state.status = 'error'
    state.error = error
  },
  [COMMIT_TRANSACTION_REQUEST]: state => {
    state.status = 'commit_loading'
  },
  [COMMIT_TRANSACTION_SUCCESS]: (state, response) => {
    state.status = 'commit_success'
    console.log(response.data)
    state.transactions.unshift(response.data)
  },
  [COMMIT_TRANSACTION_ERROR]: (state, error) => {
    state.status = 'commit_error'
    state.error = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
