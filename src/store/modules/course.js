import {HTTP} from '../../network/http-common'
export default {
  state:{
    courses: [
	  { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'},
	  { title: 'Favorite sht', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'},
	]
  },
  mutations:{
    setCourses(state, payload) {
      state.courses = payload
	},
	addCourse(state, payload) {
      state.courses.push(payload)
	}
  },
  actions:{
    async loadCourses({commit}) {
	  commit('clearError');
	  commit('setLoading', true);
	  try {
		const response = HTTP.get('/course/');
		commit('setLoading', false);
		if (200 <= response.status < 300) {
		  console.log('|||||' + response.data); //TODO убрать
		  commit('setCourses', response.data)
		} else {
		  commit('setError', {code: response.code, message: response.data});
		}
	  } catch (e) {
		commit('setLoading', false);
		commit('setError', e);
	  }
	},
	createCourse({commit}, payload) {

	}
  },
  getters:{
    courses(state) {
      return state.courses
	}
  }
}