import {HTTP} from "../../network/http-common";

export default {
  state: {
    selected: null,
	loadingUnits: false,
    items: []
  },
  mutations: {
    setSelected(state, payload) {
      state.selected = payload;
    },
    addCourse(state, payload) {
      const newCousre = {
		//TODO разобраться с айдишниками
		id: state.items.length * 7,
		name: payload.name,
		description: 'default description',
		imgSrc: 'https://bumper-stickers.ru/38068-thickbox_default/znak-elektronnoj-pochty-mailru.jpg',
		type: 'course',
		children: [],
	  };
      state.items.push(newCousre);
    },
	loadCourses(state, payload) {
      if (payload !== null && payload.length !== 0) {
		payload.forEach(curr => {
          state.items.push({
            id: curr.id,
            name: curr.name,
            description: curr.description,
            imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
            children: [],
            type: "course"
          });
		});
      }
    },
	loadUnits(state, payload) {
      //TODO найти более оптимальный способ
	  console.log(payload);
	  state.items.forEach(curr => {
	    if (curr.id === payload.id) {
	      payload.data.forEach(costyl => {
	        curr.children.push(costyl);
		  });
		}
	  });
	},
	setLoadingUnits(state, payload) {
      state.loadingUnits = payload;
	},
	deleteCourse(state, payload) {
      state.items.every((currentItem, index) => {
        if (currentItem.id === payload.id) {
          state.items.splice(index, 1);
          return false;
		}
		return true;
	  });
	}
  },
  actions: {
    async createCourse({commit}, payload) {
      if (payload != null) {
		commit('clearError');
		commit('setLoading', true);
		try {
          // Создание курса
		  const response = await HTTP.post('/course/create', payload);
		  if (200 <= response.status < 300) {
		    commit('addCourse', payload)
		  }
		} catch (e) {
		  commit('setError', e);
		}
		commit('setLoading', false);
      }
    },
	async loadCourses({ commit }) {
	  commit("clearError");
	  commit("setLoading", true);
	  try {
		const response = await HTTP.get("/course/");
		commit("setLoading", false);
		if (200 <= response.status < 300) {
		  commit("loadCourses", response.data);
		} else {
		  commit("setError", { code: response.code, message: response.data });
		}
	  } catch (e) {
		commit("setLoading", false);
		commit("setError", e);
	  }
	},
	async deleteCourse({commit}, payload) {
	  commit("clearError");
	  try {
		const response = HTTP.post("/course/delete", payload.id);
		if (200 <= response.status < 300) {
		  console.log('deleted course ' + payload.id); //TODO убрать
		  commit("deleteCourse", payload.id);
		} else {
		  commit("setError", { code: response.code, message: response.data });
		}
	  } catch (e) {
		commit("setError", e);
	  }
	},
	async loadUnitsByCourse({commit}, payload) {
	  commit('clearError');
	  try {
		const response = await HTTP.get('/unit/' + payload.id);
		if (200 <= response.status < 300) {
		  commit('loadUnits', {id: payload.id, data: response.data});
		}
	  } catch (e) {
		commit('setError', e);
	  }
	  commit('setLoadingUnits', false);
	},
	setSelected({ commit }, payload) {
	  if (payload !== null) {
		commit("setSelected", payload);
	  }
	},
	setLoadingUnits({commit}, payload) {
      commit('setLoadingUnits', payload);
	}
  },
  getters: {
    items(state) {
      return state.items;
    },
    selected(state) {
      return state.selected;
    },
	loadingUnits(state) {
      return state.loadingUnits;
	},
	courses(state) {
	  return state.courses;
	}
  }
};
