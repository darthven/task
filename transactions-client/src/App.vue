<template>
	<v-app id="home">
		<v-toolbar fixed app dark clipped-right>
			<v-toolbar-title>User Account</v-toolbar-title>
			<v-spacer></v-spacer>
			<template>
				<v-btn flat @click="fetchBalance">
					Fetch balance
				</v-btn>
				<div>Current balance: {{ balance }}</div>
			</template>
		</v-toolbar>
		<v-content>
			<v-container>
				<v-layout>
					<v-flex>
						<commit-transaction></commit-transaction>
					</v-flex>
				</v-layout>
			</v-container>
			<transaction-list></transaction-list>
		</v-content>
		<v-footer app class="pa-3">
			<v-spacer></v-spacer>
			<div>&copy; {{ new Date().getFullYear() }}</div>
		</v-footer>
	</v-app>
</template>

<script>
import TransactionList from './components/TransactionList'
import CommitTransaction from './components/CommitTransaction'
import { GET_ACCOUNT_BALANCE_REQUEST } from './store/actions/account'

export default {
	name: 'App',
	async created() {
		this.$store.dispatch(GET_ACCOUNT_BALANCE_REQUEST)
	},
	components: {
		TransactionList,
		CommitTransaction
	},
	computed: {
		balance() {
			return this.$store.getters.totalAmount
		}
	},
	methods: {
		async fetchBalance() {
			this.$store.dispatch(GET_ACCOUNT_BALANCE_REQUEST)
		}
	}
}
</script>
