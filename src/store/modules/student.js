export default {
  state: {
    selectedSTUD: null,
    groups: [
      {
        id: 1,
        name: "Group TOEFL B2",
        imgSrc:
          "http://busidiomas.com/wp-content/uploads/2017/10/examen-cae-1024x559.jpg",
        type: "group",
        children: [
          { id: 2, name: "Adamyan Petros Samwelovich", imgSrc: "", type: 'student', children: []},
          { id: 3, name: "Britikov Konstantin Krymchanovich", imgSrc: "", type: 'student', children: []}
        ]
      },
      {
        id: 4,
        name: "Group IELTS B1",
        imgSrc:
          "http://busidiomas.com/wp-content/uploads/2017/10/examen-cae-1024x559.jpg",
        type: "group",
        children: [
          { id: 5, name: "TchuWashOFF Jahor Kirovich", imgSrc: "", type: 'student', children: [] },
          { id: 6, name: "VanyashKEEN Jury^2", imgSrc: "", type: 'student', children: []}
        ]
      },
      { id: 6, name: "Group CAE C1",type: "group", children: []},
      { id: 7, name: "Other group" ,type: "group", children: []}
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
    getGroups(state) {
      return state.groups;
    },
    getSelectedSTUD(state) {
      return state.selectedSTUD;
    }
  }
};
