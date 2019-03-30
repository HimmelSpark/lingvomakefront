import {HTTP} from "../../network/http-common";

export default {
  state: {
    selected: null,
	loadingUnits: false,
    items: [
	  {
	    id: 10500,
	    name: 'Mocked name',
		description: 'Mocked description',
		imgSrc: 'https://bumper-stickers.ru/38068-thickbox_default/znak-elektronnoj-pochty-mailru.jpg',
		type: 'course',
		children: []
	  },
	  {
		id: 2,
		name: "TOEFL iBT",
		description:
			"This course is for those who pursue to get away from Russia and find better life in the USA",
		imgSrc:
			"https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
		type: "course",
		children: [
		  {
			id: 3,
			name: "Unit 1",
			description: "some TOEFL unit",
			imgSrc:
				"https://ak2.picdn.net/shutterstock/videos/1731232/thumb/1.jpg",
			type: "unit",
			children: []
		  }
		]
	  },
	  {
		id: 4,
		name: "CAE",
		description: "This course is for those who want to suffer!",
		imgSrc:
			"http://busidiomas.com/wp-content/uploads/2017/10/examen-cae-1024x559.jpg",
		type: "course",
		children: [
		  {
			id: 5,
			name: "Unit 1",
			description: "some CAE unit",
			imgSrc:
				"https://ak2.picdn.net/shutterstock/videos/1731232/thumb/1.jpg",
			type: "unit",
			children: [
			  {
				id: 6,
				type: "T1",
				data: "Psychology",
			  },
			  {
				id: 7,
				type: "T2",
				data: "Theology",
			  },
			  {
				id: 7123,
				data: "Theology",
				type: "T3"
			  },
			  {
				id: 7324,
				data: "Theology",
				type: "T2"
			  },
			  {
				id: 7239847,
				data: "Theology",
				type: "T3"
			  }
			]
		  }
		]
	  },
	  {
		id: 8,
		name: "GMAT",
		description:
			"This course is for those who think that maths in english sound so sexy!",
		imgSrc: "https://www.newszii.com/wp-content/uploads/2018/11/GMAT.png",
		type: "course",
		children: [
		  {
			id: 9,
			name: "Unit 1",
			type: "unit"
		  }
		]
	  }
	]
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
	deleteCourse(state, payload) {
	  state.items.every((currentItem, index) => {
		if (currentItem.id === payload.id) {
		  state.items.splice(index, 1);
		  return false;
		}
		return true;
	  });
	},

	addUnit(state, payload) {
      state.items.every((curr) => {
        if (curr.id === payload.course_id) {
          curr.children.push({
			name: payload.unit_name,
			children: [],
			description: payload.description,
			position: payload.position
		  });
          return false;
		}
		return true;
	  });
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

	async createUnit({commit}, payload) {
      //TODO возможно есть смысл потом запросить созданный юнит, чтобы получить его id
      if (payload !== null) {
		commit('clearError');
		commit('setLoading', true);
		try {
		  const response = await HTTP.post('/unit/create', payload);
		  if (200 <= response.status < 300) {
			commit('addUnit', payload)
		  }
		} catch (e) {
		  commit('setError', e);
		}
		commit('setLoading', false);
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
