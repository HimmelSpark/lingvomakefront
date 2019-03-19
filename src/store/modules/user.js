import { HTTP } from "../../network/http-common";
import HttpService from "../../network/http";
import User from "./usr";

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
    // async registerUser({commit}, payload) {
    // 	commit('clearError');
    // 	commit('setLoading', true);
    // 	console.log(payload);
    // 	try {
    // 	  	// Создание пользователя
    // 		const response = await HTTP.post('/admin/register', payload.user);
    // 		commit('setLoading', false);
    // 		if (200 <= response.status < 300) {
    // 		  commit('setUser', payload);
    //
    // 		  // Создание школы
    // 		  commit('setLoading', true);
    // 		  const response2 = await HTTP.post('/school/create', {name: payload.school});
    // 		  commit('setLoading', false);
    // 		  if (200 <= response2.status < 300) {
    // 			commit('setSchool', payload.school)
    // 		  }
    // 		} else {
    // 			// commit('setError', {code: response.code, message: response.data});
    // 			throw new Error(response) //TODO продумать эту часть
    // 		}
    // 	} catch (e) {
    // 		commit('setLoading', false);
    // 		commit('setError', e);
    // 		throw e
    // 	}
    //
    // },
    registerUser({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      const userData = JSON.stringify(payload.user);
      User.signUp(userData)
        .then(user => {
          commit("setUser", user);

          User.createSchool(JSON.stringify({ name: payload.school }))
            .then(_ => {
              commit("setSchool", payload.school);
              commit("setLoading", false);
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
            });
        })
        .catch(error => {
          commit("setError", error);
          commit("setLoading", false);
        });

      // commit('clearError');
      // commit('setLoading', true);
      // console.log(payload.user);
      // const userData = JSON.stringify(payload.user);
      // HttpService.post('/admin/register', userData, (err, resp) => {
      //   if (!err) { // если удачно зарегались
      //     HttpService.post('/school/create', JSON.stringify({name: payload.school}), (err2, resp2) => {
      //       commit('setLoading', false);
      //       if (!err2) { // если уданчо создали школу
      //         commit('setUser', payload);
      //         commit('setSchool', payload.school);
      //         } else {
      //         commit('setError', err2);
      //         }
      //     });
      //   } else {
      //     commit('setLoading', false);
      //     commit('setError', err);
      //     }
      // });
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
