import {HTTP} from "../../network/http-common";

export default {
  state: {
    search:null,
    selectedSTUD: null,
    groups: [
      { id: 0, name: "All students", type:"all"},
    ],
    // courses: [],
    students: [
    ],
    headers: [
      {
        text: "surname",
        value: "surname"
      },
      {
        text: "name",
        value: "name"
      },
      {
        text: "groups",
        value: "groups"
      }
      ,
      {
        text: "email",
        value: "email"
      },
      {
        text: "phone",
        value: "phone"
      }

    ]
  },
  mutations: {
    setSelectedSTUD(state, payload) {
      state.selectedSTUD = payload;
    },
    // addCourse(state, payload) {
    //   console.log('student add cource');
    //   state.courses.push(payload);
    // },
  addGroup(state, payload) {
    const newGroup = {
      //TODO разобраться с айдишниками
      id: state.items.length * 7,
      name: payload.name,
      description: 'default description',
      imgSrc: 'https://bumper-stickers.ru/38068-thickbox_default/znak-elektronnoj-pochty-mailru.jpg',
      type: 'course',
    };
    state.groups.push(newGroup);
  },
    addStudent(state, payload){
      state.students.push({
        id: payload.id,
        name: payload.name,
        surname: payload.surname,
        description: payload.description,
        email: payload.email,
        group: payload.group,
        phone: payload.phone,
        groupName: payload.groupName,
        type: "student",
        imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
        children: [],
      });
    },
    // loadCourses(state, payload) {
    //   if (payload !== null && payload.length !== 0) {
    //     payload.forEach(curr => {
    //       state.courses.push({
    //         id: curr.id,
    //         name: curr.name,
    //         description: curr.description,
    //         imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
    //         children: [],
    //         type: "course"
    //       });
    //     });
    //   }
    // },
  loadsGroups(state, payload) {
    if (payload !== null && payload.length !== 0 && state.groups.length<2) {
      payload.forEach(curr => {
        state.groups.push({
          id: curr.id,
          name: curr.name,
          description: curr.description,
          course_id:curr.course_id,
          type: "group",
          imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
          children: [],
        });
      });
    }
  },
  loadStudents(state, payload) {
    if (payload !== null && payload.length !== 0 && state.students.length<1) {
      payload.forEach(curr => {
        let i,j = null;
        let gName = [];
        for (i in curr.group_id){
          for (j in state.groups){
            if(state.groups[j].id === curr.group_id[i]){
              gName.push(state.groups[j].name);
              break;
            }
          }
        }
        state.students.push({
          id: curr.id,
          name: curr.name,
          surname: curr.surname,
          description: curr.description,
          email: curr.email,
          group: curr.group_id,
          phone: curr.phone,
          groupName: gName,
          type: "student",
          imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
          children: [],
        });
      });
    }
  },
  setLoadingStudents(state, payload) {
    state.loadingStudents = payload;
  }
  },
  actions: {
  // async loadCourses({commit}) {
  //   commit('clearError');
  //   try {
  //     const response = await HTTP.get('/course/');
  //     if (200 <= response.status < 300) {
  //       commit('loadCourses', response.data)
  //     }
  //   } catch (e) {
  //     commit('setError', e);
  //   }
  // },
    async createsGroup( {commit}, payload) {
        console.log('createsGroup');
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);

        try {
          // Создание курса
          const response = await HTTP.post('/group/create', payload);
          commit('addGroup', payload)
        } catch (e) {
          commit('setError', e.response.data);
        } finally {
            commit('setLoading', false);
        }
      }
    },
    async createsStudent( {commit}, payload) {
        console.log('createsStudent');
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);

        try {
          // Создание курса
          const response = await HTTP.post('/student/create', payload);
          commit('addStudent', response.data);
        } catch (e) {
          commit('setError', e);
        }
        commit('setLoading', false);
      }
    },
    async changesGroup( {commit}, payload) {
        console.log('changesGroup');
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);

        try {
          // Создание курса

          const response = await HTTP.post('/group/edit', payload);
          if (200 <= response.status < 300) {
            commit('addGroup', payload)
          }
        } catch (e) {
          commit('setError', e);
        }
        commit('setLoading', false);
      }
    },
      async changesStudent( {commit}, payload) {
        console.log('changesStudent');
          if (payload != null) {
              commit('clearError');
              commit('setLoading', true);

              try {
                  // Создание курса

                  const response = await HTTP.post('/student/change', payload);
                  if (200 <= response.status < 300) {
                      commit('addGroup', payload)
                  }
              } catch (e) {
                  commit('setError', e);
              }
              commit('setLoading', false);
          }
      },
    async loadGroups({commit}) {
        console.log('loadGroups');
      commit('clearError');
      try {
        const response = await HTTP.get('/group/');
        commit('loadsGroups', response.data)
      } catch (e) {
        commit('setError', e.response.data);
      }
    },
    async loadAllStudents({commit}) {
        console.log('loadAllStudents');
      commit('clearError');
      try {
        const response = await HTTP.get('/student/');
        commit('loadStudents', response.data);
      } catch (e) {
        commit('setError', e.response.data);
      }
      commit('setLoadingStudents', false);
    },
    setSelectedSTUD({ commit }, payload) {
      commit("setSelectedSTUD", payload);
    },
    async deletesGroup( {commit}, payload) {
        console.log('deletesGroup');
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);

        try {
          // Создание курса

          const response = await HTTP.post('/group/delete', payload);
          if (200 <= response.status < 300) {
            // commit('deleteGroup', payload)
          }
        } catch (e) {
          commit('setError', e);
        }
        commit('setLoading', false);
      }
    },
      async deletesStudent( {commit}, payload) {
        console.log('deletesStudent');
          if (payload != null) {
              commit('clearError');
              commit('setLoading', true);

              try {
                  // Создание курса

                  const response = await HTTP.post('/student/delete', payload);
                  if (200 <= response.status < 300) {
                      // commit('deleteGroup', payload)
                  }
              } catch (e) {
                  commit('setError', e);
              }
              commit('setLoading', false);
          }
      },
  },
  getters: {
    getGroupNames(state){
      var names = [];
      var i = 1;
      for ( i in state.groups){
        if(state.groups[i].id!==0) {
          names.push([state.groups[i].name])
        }
      }
      return names;
    },
    // getCourseNames(state){
    //   var i = 0;
    //   var resp = [];
    //   for (i in state.courses){
    //     resp.push(state.courses[i].name);
    //   }
    //   return resp;
    // },
    getStudents(state){
      if (state.selectedSTUD!==null && state.selectedSTUD.type === "group") {
        var student = [];
        var flag = false;
        var i,j = 0;
        for (i in state.students) {
          for (j in state.students[i].group) {
            if (state.students[i].group[j] === state.selectedSTUD.id) {
              flag = true;
              break;
            }
          }
          if (flag === true) {
            student.push(state.students[i]);
          }
          flag = false;
        }
        return student;
      } else {
        return state.students;
      }
    },
    getHead(state){
      return state.headers;
    },
    getGroups(state) {
      return state.groups;
    },
    getSelectedSTUD(state) {
      return state.selectedSTUD;
    },
    // getCourses(state){
    //   return state.courses;
    // }
  }
};
