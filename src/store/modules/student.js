import {HTTP} from "../../network/http-common";

export default {
  state: {
    search:null,
    groups: [
      { id: 0, name: "All students", type:"all"},
    ],
    names: [],
    students: [
    ],
      GroupId:0,
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
    // addCourse(state, payload) {
    //   console.log('student add cource');
    //   state.courses.push(payload);
    // },
      setGroup(state,id){
          console.log("GroupIdSet");
          state.GroupId = id;
          console.log(state.GroupId)
      },
      addGroup: function (state, payload) { //TODO добавить
          const newGroup = {
              //TODO разобраться с айдишниками
              id: state.items.length,
              name: payload.name,
              description: 'default description',
              imgSrc: 'https://bumper-stickers.ru/38068-thickbox_default/znak-elektronnoj-pochty-mailru.jpg',
              type: 'course',
          };
          state.groups.push(newGroup); //TODO вместо этого лучше заново прогрузить список групп
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
          state.groups = [
              { id: 0, name: "All students", type:"all"},
          ];

      payload.forEach(curr => {
          // console.log(curr);
        state.groups.push({
          id: curr.id,
          name: curr.name,
          description: curr.description,
          course_id:curr.course_id,
          curr_unit: curr.curr_unit,
          type: "group",
          imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
          children: [],
        });
      });

      state.groups.forEach(gr => console.log(gr));
  },
  loadStudents(state, payload) {
          console.log("Students");
      state.students = [];
    if (payload !== null && payload.length !== 0 && state.students.length<1) {
      payload.forEach(curr => {
        let i,j = null;
        let gName = [];
        console.log(curr.group_id);
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
      setGroupNames(state) {
          var i = 1;
          console.log("GROUPENFURHER");
          state.names = [];
          for ( i in state.groups){
              if(state.groups[i].id!==0) {
                  console.log(state.groups[i].name)
                  state.names.push([state.groups[i].name])
              }
          }
      },
  setLoadingStudents(state, payload) {
    state.loadingStudents = payload;
  }
  },
  actions: {
    async createsGroup( {commit}, payload) {
        console.log('createsGroup');
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);

        try {
          // Создание курса
          const response = await HTTP.post('/group/create', payload);
          console.log("createsGroup", response.data);
          this.$router.push("/students/");
          // commit('addGroup', payload) //TODO дебаг
        } catch (e) {
          console.log(e);
          commit('setError', e);
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
          console.log(response.data);
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
                      // commit('loadS', payload)
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
        commit('loadsGroups', response.data);
        commit('setGroupNames');
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
      } finally {
          commit('setLoadingStudents', false);
      }
    },

    async loadAllStudentsByGroupId({commit}, {next, id}) {
        console.log('loadAllStudentsByGroupId');

        console.log(id);
        console.log(next);
        commit('clearError');
        try {
            // toto ГОРИТ
            const response = await HTTP.get('/student/group/' + id);
            commit('loadStudents', response.data);
            commit('setGroup',id);
            next();
        } catch (e) {
            console.log('loadAllStudentsByGroupIdError,  ', e);
            commit('setError', e.response.data);
        } finally {
            commit('setLoadingStudents', false);
        }
    },

    async deletesGroup( {commit}, payload) {
      console.log('deletesGroup');
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);

        try {
          const response = await HTTP.post('/group/delete', payload);
          this.$router.push("/students/");
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

              } catch (e) {
                  commit('setError', e);
              }
              commit('setLoading', false);
          }
      },
  },
  getters: {
    getGroupNames(state) {

      return state.names;
    },
      getGroup(state){
        let i = 0;
          console.log("GroupSelect");
          console.log(state.GroupId);
          for ( i in state.groups) {
              if (state.groups[i].id === state.GroupId) {

                  console.log("FINALLY")
                  console.log(state.groups[i]);
                  return (state.groups[i]);
              }
              console.log(state.groups[i]);
          }
      },
    // getCourseNames(state){
    //   var i = 0;
    //   var resp = [];
    //   for (i in state.courses){
    //     resp.push(state.courses[i].name);
    //   }
    //   return resp;
    // },
    students: state => state.students,

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
