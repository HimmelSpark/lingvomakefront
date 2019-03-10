import * as nw from '@/web/network'
import axios from 'axios'
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
		async registerUser({commit}, payload) {
			console.log("registerUser");
			console.log(userData);
			const response = await axios.post('http://localhost:8090/admin/register', payload);
			console.log("response:  ", response);
		}
	},
	getters: {
		user(state) {
			return state.user
		}
	}
}
