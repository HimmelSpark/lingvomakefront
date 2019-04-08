import {HTTP} from "../../network/http-common";

export default {
  state: {
    school: null,
  },
  mutations: {
	setSchool(state, school) {
	  state.school = school;
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
	  } catch (e) {
		commit('setError', e);
	  } finally {
		commit('setLoading', false);
	  }
	}
  },
  getters: {
    school(state) {
      return state.school;
	}
  }
}