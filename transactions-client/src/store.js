import Vue from 'vue'
import Vuex from 'vuex'

import transaction from './store/modules/transaction'
import account from './store/modules/account'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    transaction,
    account
  },
  strict: debug
})
