import {HTTP} from "../../network/http-common";

export default {
  state: {
    search:null,
    selectedSTUD: null,
    groups: [
      { id: 0, name: "All students", type:"all"},
      // {
      //   id: 1,
      //   name: "Group TOEFL B2",
      //   imgSrc:
      //     "http://busidiomas.com/wp-content/uploads/2017/10/examen-cae-1024x559.jpg",
      //   type: "group",
      //   description: "This is the group for the brokenhearted",
      //   children: [
      //
      //   ]
      // },
      // {
      //   id: 4,
      //   name: "Group IELTS B1",
      //   imgSrc:
      //     "http://busidiomas.com/wp-content/uploads/2017/10/examen-cae-1024x559.jpg",
      //   type: "group",
      //   description: "It's my life",
      //   children: [
      //
      //   ]
      // },
      // { id: 6, name: "Group CAE C1", type: "group", children: [] },
      // { id: 7, name: "Other group", type: "group", children: [] },


      ],
    courses: [],
    students: [
      // {
      //   id: 2,
      //   email: "pedro@huan.mail",
      //   name: "Petros",
      //   surname: "Adamyan",
      //   password: "",
      //   group: [1],
      //   groupName: ["Group TOEFL B2"],
      //   phone: "88005553553"
      // },
      // {
      //   id: 3,
      //   email: "breet@vse.mail",
      //   name: "Britikov",
      //   surname: "Kistyantin",
      //   password: "",
      //   group: [1],
      //   groupName: ["Group TOEFL B2"],
      //   phone: "88006553553"
      // },
      // {
      //   id: 4,
      //   email: "Chuvo@YaNeUslishal.mail",
      //   name: "ChuvAhov",
      //   surname: "Yahor",
      //   password: "",
      //   group: [1,4],
      //   phone: "88005503553",
      //   groupName: ["Group IELTS B1", "Group TOEFL B2"]
      // },
      // {
      //   id: 6,
      //   email: "Vanya@Sh.Keen",
      //   name: "Yury",
      //   surname: "Vanyashkin",
      //   password: "",
      //   phone: "88005523553",
      //   group: [4],
      //   groupName: ["Group IELTS B1"]
      // }
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
    addCourse(state, payload) {
      console.log('student add cource');
      state.courses.push(payload);
    },
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
    loadCourses(state, payload) {
      if (payload !== null && payload.length !== 0) {
        payload.forEach(curr => {
          state.courses.push({
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
  async loadCourses({commit}) {
    commit('clearError');
    try {
      const response = await HTTP.get('/course/');
      if (200 <= response.status < 300) {
        commit('loadCourses', response.data)
      }
    } catch (e) {
      commit('setError', e);
    }
  },
    async createsGroup( {commit}, payload) {
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);

        try {
          // Создание курса

          const response = await HTTP.post('/group/create', payload);
          commit('addGroup', payload)
        } catch (e) {
          commit('setError', e.response.data);
        }
        commit('setLoading', false);
      }
    },
    async createsStudent( {commit}, payload) {
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
      commit('clearError');
      try {
        const response = await HTTP.get('/group/');
        commit('loadsGroups', response.data)
      } catch (e) {
        commit('setError', e.response.data);
      }
    },
    async loadAllStudents({commit}) {
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
    getCourseNames(state){
      var i = 0;
      var resp = [];
      for (i in state.courses){
        resp.push(state.courses[i].name);
      }
      return resp;
    },
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
    getCourses(state){
      return state.courses;
    }
  }
};
