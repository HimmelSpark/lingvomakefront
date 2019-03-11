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
			console.log(payload);
			try {
				const response = await axios.post('http://localhost:8090/admin/register', payload);
				commit('setLoading', false);
				if (200 <= response.status < 300) {
					commit('setUser', payload);
				} else {
					// commit('setError', {code: response.code, message: response.data});
					throw new Error(response) //TODO продумать эту часть
				}
			} catch (e) {
				commit('setLoading', false);
				commit('setError', e);
				throw e
			}

		},
		async authUser({commit}, payload) {
			commit('clearError');
			commit('setLoading', true);
			console.log('login user');
			try {
				const response = await axios.post('http://localhost:8090/admin/auth', payload);
				// commit('setLoading', false);
				if (200 <= response.status < 300) {
					try {
						const responseWithUserData = await axios.get('http://localhost:8090/admin/info');
						if (200 <= response.status < 300) {
							commit('setLoading', false);
							commit('setUser', payload);
						} else {
							throw new Error(response) //TODO продумать эту часть
						}
					} catch (e) {
						commit('setLoading', false);
						commit('setError', e);
						throw e
					}
				}
			} catch (e) {
				commit('setLoading', false);
				commit('setError', e);
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
