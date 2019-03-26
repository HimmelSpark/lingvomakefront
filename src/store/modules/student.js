export default {
  state: {
    search:null,
    selectedSTUD: null,
    groups: [
      { id: 0, name: "All students", type:"all"},
      {
        id: 1,
        name: "Group TOEFL B2",
        imgSrc:
          "http://busidiomas.com/wp-content/uploads/2017/10/examen-cae-1024x559.jpg",
        type: "group",
        description: "This is the group for the brokenhearted",
        children: [

        ]
      },
      {
        id: 4,
        name: "Group IELTS B1",
        imgSrc:
          "http://busidiomas.com/wp-content/uploads/2017/10/examen-cae-1024x559.jpg",
        type: "group",
        description: "It's my life",
        children: [

        ]
      },
      { id: 6, name: "Group CAE C1", type: "group", children: [] },
      { id: 7, name: "Other group", type: "group", children: [] },


      ],
    students: [
      {
        id: 2,
        email: "pedro@huan.mail",
        name: "Petros",
        surname: "Adamyan",
        password: "",
        group: [1],
        groupName: ["Group TOEFL B2"],
        phone: "88005553553"
      },
      {
        id: 3,
        email: "breet@vse.mail",
        name: "Britikov",
        surname: "Kistyantin",
        password: "",
        group: [1],
        groupName: ["Group TOEFL B2"],
        phone: "88006553553"
      },
      {
        id: 4,
        email: "Chuvo@YaNeUslishal.mail",
        name: "ChuvAhov",
        surname: "Yahor",
        password: "",
        group: [1,4],
        phone: "88005503553",
        groupName: ["Group IELTS B1", "Group TOEFL B2"]
      },
      {
        id: 6,
        email: "Vanya@Sh.Keen",
        name: "Yury",
        surname: "Vanyashkin",
        password: "",
        phone: "88005523553",
        group: [4],
        groupName: ["Group IELTS B1"]
      }
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
    }
  },
  actions: {
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
