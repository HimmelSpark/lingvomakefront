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
			commit('clearError');
			commit('setLoading', true);
			console.log("registerUser");
			console.log(payload);
			try {
				const response = await axios.post('http://localhost:8090/admin/register', payload);
				commit('setLoading', false);
				if (200 <= response.status < 300) {
					commit('setUser', payload);
				} else {
					// commit('setError', {code: response.code, message: response.data});
					throw new Error()
				}
			} catch (e) {
				commit('setLoading', false);
				commit('setError', {code: response.code, message: response.data});
				throw e
			}

		}
	},
	getters: {
		user(state) {
			return state.user
		}
	}
}
