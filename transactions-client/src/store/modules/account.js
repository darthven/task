import axios from 'axios'
import { GET_ACCOUNT_BALANCE_REQUEST, GET_ACCOUNT_BALANCE_SUCCESS, GET_ACCOUNT_BALANCE_ERROR } from '../actions/account'

const state = {
  totalAmount: 0,
  status: null,
  error: null
}

const getters = {
  totalAmount: state => state.totalAmount
}

const actions = {
  [GET_ACCOUNT_BALANCE_REQUEST]: async ({ commit }) => {
    commit(GET_ACCOUNT_BALANCE_REQUEST)
    try {
      const response = await axios.get(`api/v1/account/balance`)
      commit(GET_ACCOUNT_BALANCE_SUCCESS, response)
    } catch (error) {
      commit(GET_ACCOUNT_BALANCE_ERROR, error)
    }
  }
}

const mutations = {
  [GET_ACCOUNT_BALANCE_REQUEST]: state => {
    state.status = 'loading'
  },
  [GET_ACCOUNT_BALANCE_SUCCESS]: (state, response) => {
    state.status = 'success'
    state.totalAmount = response.data.total
  },
  [GET_ACCOUNT_BALANCE_ERROR]: (state, error) => {
    state.status = 'error'
    state.error = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
