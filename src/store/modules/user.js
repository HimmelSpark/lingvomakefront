import { HTTP } from "../../network/http-common";
import { Bus } from "../../modules/bus";
export default {
  state: {
    user: null,
    school: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setSchool(state, payload) {
      state.school = payload;
    }
  },
  actions: {
    async registerUser({commit}, payload) {
    	commit('clearError');
    	commit('setLoading', true);
    	console.log(payload);
    	try {
    	  	// Создание пользователя
		  	payload.user.schoolName = payload.school;
    		const response = await HTTP.post('/admin/register', payload.user);
    		commit('setLoading', false);
    		if (200 <= response.status < 300) {
    		  commit('setUser', payload);
			  commit('setSchool', payload.school);
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
    async authUser({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      console.log("login user");
      try {
        const response = await HTTP.post("/admin/auth", payload);
        // commit('setLoading', false);
        if (200 <= response.status < 300) {
          try {
            const responseWithUserData = await HTTP.get("/admin/info");
            if (200 <= response.status < 300) {
              commit("setLoading", false);
              commit("setUser", payload);
            } else {
              throw new Error(response); //TODO продумать эту часть
            }
          } catch (e) {
            commit("setLoading", false);
            commit("setError", e);
            throw e;
          }
        }
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e);
        throw e;
      }
    },
    async logout({commit}) {
	  commit("clearError");
	  commit("setLoading", true);
	  commit('renderPermission', false);
	  console.log('-- in logout');
	  try {
		const response = await HTTP.post("/admin/logout");
		// commit('renderPermission', true);
		if (200 <= response.status < 300) {
		  commit("setLoading", false);
		  commit("setUser", null);
		} else {
		  throw new Error(response);
		}
	  } catch (e) {
		commit("setLoading", false);
		commit("setError", e);
		// commit('renderPermission', true);
		throw e;
	  }
	}
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserLoggedIn(state) {
      return state.user !== null;
    }
  }
};
