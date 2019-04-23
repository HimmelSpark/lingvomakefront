import {HTTP} from "../../network/http-common";
import bus from "../../modules/bus";
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
        console.log('data-tree add cource,  ', payload );
      const newCousre = {
        id: payload.id,
		name: payload.name,
		description: 'default description',
		imgSrc: 'https://bumper-stickers.ru/38068-thickbox_default/znak-elektronnoj-pochty-mailru.jpg',
		type: 'course',
		children: [],
	  };
      state.items.push(newCousre);
    },
	loadCourses(state, payload) {
      let res = [];
      if (payload !== null && payload.length !== 0) {
		payload.forEach(curr => {
          res.push({
            id: curr.id,
            name: curr.name,
            description: curr.description,
            imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
            children: [],
            type: "course"
          });
		});
		state.items = res;
      } else {
          state.items = [];
      }
    },
	deleteCourse(state, payload) {
        for (let i = 0; i < state.items.length; ++i) {
            if (state.items[i].id === parseInt(payload.id)) {
                state.items.splice(i, 1);
                break;
            }
        }
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
	  for (let i = 0; i < state.items.length; i++) {
	    if (state.items[i].id === payload.id) {
	      let preparedData = null;
		  payload.data.forEach((currUnit) => {
		    currUnit.type = "unit";
		    currUnit.children = [];
		  });
		  preparedData = payload.data;
		  state.items[i].children = preparedData;
		  break;
		}
	  }
	  payload.next()
	},
    loadUnit(state, payload) {
        for (let i = 0; i < state.items.length; i++) {
            if (state.items[i].id === payload.id) {
                let preparedData = null;
                const unit = payload.data;
                unit.type = 'unit';
                unit.children = [];
                preparedData = unit;
                state.items[i].children.push(unit);
                break;
            }
        }
    },
	setLoadingUnits(state, payload) {
      state.loadingUnits = payload;
	},
	deleteUnit(state, unit) {
      state.items.forEach(course => {
        if (course.id === unit.course_id) {
          course.children.forEach((cUnit, index) => {
            if (cUnit.id === unit.id) {
              course.children.splice(index, 1)
			}
		  })
		}
	  });
	},

	loadTasks(state, {next, id, tasks}) {

      console.log(tasks);

      // стираются лишние данные, таски приводятся в порядок
      tasks.forEach(task =>
      {
          if(task.task) {
              console.log(task);
              task.task = JSON.parse(task.task.value);
          }
      });

      state.items.forEach((currCourse) => {
        currCourse.children.forEach((currUnit) => {
          if (currUnit.id === parseInt(id)) {
            currUnit.children = tasks;
          }
		});
      });
	  next()
	},
    loadTasksWithoutNext(state, {id, tasks}) {
        // стираются лишние данные, таски приводятся в порядок
        tasks.forEach(task => {task.task = JSON.parse(task.task.value)});
      state.items.forEach(currCourse => {
          currCourse.children.forEach(currUnit => {
              if (currUnit.id === parseInt(id)) {
                  currUnit.children = tasks;
              }
          });
      });
    },
  },
  actions: {
    async createCourse({commit}, payload) {
      console.log('createCourse');
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);
        try {
          // Создание курса
		  const response = await HTTP.post('/course/create', payload);
		  console.log("creating course  -  ", response.data);
		  commit('addCourse', response.data);
        } catch (e) {
          commit('setError', e.response.data);
        } finally {
            commit('setLoading', false);
        }
      }
  	},
	async loadCourses({ commit }) {
      console.log('loadCourses');
	  commit("clearError");
	  commit("setLoading", true);
	  try {
			const response = await HTTP.get("/course/");
			commit("setLoading", false);
			commit("loadCourses", response.data);
	  } catch (e) {
			commit("setLoading", false);
			console.log(e);
			commit("setError", e.response.data);
	  }
	},
	async deleteCourse({commit}, payload) {
	  commit("clearError");
	  try {
		const response = await HTTP.post("/course/delete", payload.id);
		console.log('deleteCource, ', response.data);
		// commit("deleteCourse", payload);
	  } catch (e) {
		commit("setError", e.response.data);
	  }
	},

	async createUnit({commit}, payload) {
		if (payload !== null) {
			commit('clearError');
			commit('setLoading', true);
			try {
			  	console.log("creating unit  - ", payload);
		  		const response = await HTTP.post('/unit/create', payload);
		  		console.log("created unit  - ", response.data);
		  		// commit('addUnit', response.data);
			} catch (e) {
		  	commit('setError', e.response.data);
			} finally {
                commit('setLoading', false);
            }
	  }
	},
    async loadUnitById({commit}, payload) {
        commit('clearError');
        console.log('loadUnitById');
        try {
            console.log(payload);
            const response = await HTTP.get('/unit/find/' + payload.id);
            console.log('loadingUnitById,  ', response.data);
            commit('loadUnit', {id: response.data.course_id, data: response.data, next: payload.next});
        } catch (e) {
            console.log('loadUnitByIdError, ', e);
            commit('setError', e.response.data);
        } finally {
            commit('setLoadingUnits', false);
        }
    },
	async loadUnitsByCourse({commit}, {next, payload}) {
      console.log('loadUnitsByCourse');
	  commit('clearError');
	  try {
	      console.log('payload, ', payload);
			const response = await HTTP.get('/unit/' + payload.id);
			console.log('loadedUnitsByCourse,  ', response.data);
			commit('loadUnits', {id: payload.id, data: response.data, next: next});
	  } catch (e) {
	        console.log('loadUnitsByCourseError,  ', e);
			commit('setError', e.response.data);
	  } finally {
          commit('setLoadingUnits', false);
      }
	},
	async deleteUnit({commit}, unit) {
	  commit("clearError");
	  try {
		const response = await HTTP.post("/unit/delete", {id: parseInt(unit.id)});
		commit('deleteUnit', unit);
	  } catch (e) {
		commit("setError", e.response.data);
	  }
	},
	setLoadingUnits({commit}, payload) {
	  commit('setLoadingUnits', payload);
	},

	async loadTasksByUnit({commit}, {next, id}) {
      console.log('loadTasksByUnit');
	  commit('clearError');
	  try {
		let response = await HTTP.get('/task/' + id);
		console.log("loaded tasks: ", response.data);
		commit('loadTasks', {next: next, id: id, tasks: response.data});
	  } catch (e) {
	      console.log('loadTasksByUnitError,  ', e);
		commit('setError', e.response.data);
	  }
	},
    async loadTasksByUnitWithoutNext({commit}, id) {
        console.log('loadTasksByUnitWithoutNext');
        commit('clearError');
        try {
            let response = await HTTP.get('/task/' + id);
            console.log("loaded tasks: ", response.data);
            commit('loadTasksWithoutNext', {id: id, tasks: response.data});
        } catch (e) {
            console.log('loadTasksByUnitWithoutNextError,  ', e);
            commit('setError', e.response.data);
        }
    },
	async createTask({commit}, newTask) {
      if (newTask.unit_id !== null) {
		commit('clearError');
		commit('setLoading', true);
		try {
		  const response = await HTTP.post('/task/create', newTask);
		  console.log("creating task - ", response.data);
		} catch (e) {
		    console.log(e);
		  commit('setError', e.response.data);
		}
		finally {
            commit('setLoading', false);
        }
	  }
	},
    async deleteTaskById({commit}, id) {
        console.log('deleteTaskById');
        commit('clearError');
        commit('setLoading', true);
        try {
            const response = await HTTP.post('/task/delete', id);
            console.log('deleted task, ', response.data);
        } catch (e) {
            console.log(e);
            commit('setError', e.response.data);
        } finally {
            commit('setLoading', false);
        }
    },

	setSelected({commit}, payload) {
	  if (payload !== null) {
		commit("setSelected", payload);
	  }
	},

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
	// courses(state) {
	//   return state.courses;
	// },
     getCourseNames(state) {
        let resp = [];
        for (let i = 0; i < state.items; ++i) {
            resp.push(state.items[i].name);
        }
        return resp;
      },
	courseById: state => {
      return id => {
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].id === parseInt(id)) {
            return state.items[i]
		  }
		}
	  }
	},
	unitById: state => {
      return id => {
        for (let i = 0; i < state.items.length; i++) {
          for (let j = 0; j < state.items[i].children.length; j++) {
            if (state.items[i].children[j].id === parseInt(id)) {
              return state.items[i].children[j]
			}
		  }
		}
	  }
	}

  }
};
