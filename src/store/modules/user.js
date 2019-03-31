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
        commit('setUser', payload);
			  commit('setSchool', payload.school); 
    	} catch (e) {
    		commit('setLoading', false);
        commit('setError', e.response.data);
    	}

    },
    async authUser({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      console.log("login user");
      try {
        const response = await HTTP.post("/admin/auth", payload);
        try {
          const responseWithUserData = await HTTP.get("/admin/info");
          commit("setLoading", false);
          commit("setUser", payload);
        } catch (e) {
          commit("setLoading", false);
          commit("setError", e.response.data);
        }
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e.response.data);
      }
    },
    async logout({commit}) {
	    commit("clearError");
	    commit("setLoading", true);
	    commit('setRenderPermission', false);
	    try {
        const response = await HTTP.post("/admin/logout");
        commit("setLoading", false);
        commit("setUser", null);
        commit('setRenderPermission', true); 
	    } catch (e) {
		    commit("setLoading", false);
		    commit("setError", e.response.data);
		    commit('setRenderPermission', true);
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
