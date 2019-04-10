import {HTTP} from "../../network/http-common";

export default {
  state: {
    school: null,
	appLink: null,
  },
  mutations: {
	setSchool(state, school) {
	  state.school = school;
	},
	setAppLink(state, link) {
	  state.appLink = link;
	}
  },
  actions: {
    async loadSchool({commit}) {
      console.log("loadSchool");
      try {
		const response = await HTTP.get("/school/");
		console.log(response.data);
		commit('setSchool', response.data);
	  } catch (e) {
		commit('setError', e);
	  }
	},
	async generateApplication({commit}) {
      console.log('generateApplication');
	  try {
        commit('setLoading', true);
		const response = await HTTP.post("/school/makeapp");
		console.log(response.data);
		commit('setAppLink', response.data);
	  } catch (e) {
		commit('setError', e.response.data);
	  } finally {
		commit('setLoading', false);
	  }
	},
	async saveApplication({commit}, payload) {
      console.log('saveApplication');
      try {
		commit('setLoading', true);
		const response = await HTTP.post("/school/change", payload);
		commit('setSchool', payload);
	  } catch (e) {
		commit('setError', e.response.data);
	  } finally {
		commit('setLoading', false);
	  }
	},
	//TODO удалить после тестирования
	setAppLink({commit}, appLink) {
      commit('setAppLink', appLink);
	}
  },
  getters: {
    school(state) {
      return state.school;
	},
	getApp(state) {
      return state.appLink;
	}
  }
}