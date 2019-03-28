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
  loadsGroups(state, payload) {

    if (payload !== null && payload.length !== 0) {
      payload.forEach(curr => {
        state.groups.push({
          id: curr.id,
          name: curr.name,
          description: curr.description,
          type: "group",
          imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
          children: [],
        });
      });
    }
  },
  loadStudents(state, payload) {
    console.log(payload);
    if (payload !== null && payload.length !== 0) {
      payload.forEach(curr => {
        var i,j = null;
        var gName = []
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
    async createGroup({commit}, payload) {
      if (payload != null) {
        commit('clearError');
        commit('setLoading', true);
        console.log(payload);
        try {
          // Создание курса
          const response = await HTTP.post('/group/create', payload);
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
        if (200 <= response.status < 300) {
          console.log(response.data);
          commit('loadsGroups', response.data)
        }
      } catch (e) {
        commit('setError', e);
      }
    },
    async loadAllStudents({commit}) {
      commit('clearError');
      try {
        const response = await HTTP.get('/student/');
        if (200 <= response.status < 300) {
          commit('loadStudents', response.data);
        }
      } catch (e) {
        commit('setError', e);
      }
      commit('setLoadingStudents', false);
    },
    setSelectedSTUD({ commit }, payload) {
      commit("setSelectedSTUD", payload);
    }
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
    }
  }
};
