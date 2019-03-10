import * as nw from '@/web/network'

export default {
	state: {
		user: null
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		}
	},
	actions: {
		registerUser({commit}, {email, password}) {
			nw.register(email, password)
				.then(user => {
					commit('setUser', user)
				})

		}
	},
	getters: {
		user(state) {
			return state.user
		}
	}
}