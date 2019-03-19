export default {
  state: {
    selected: null,
    items: [
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
                name: "Psychology",
                type: "task"
              },
              {
                id: 7,
                name: "Theology",
                type: "task"
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
    }
  },
  actions: {
    setSelected({ commit }, payload) {
      if (payload !== null) {
        commit("setSelected", payload);
      }
    }
  },
  getters: {
    items(state) {
      return state.items;
    },
    selected(state) {
      return state.selected;
    }
  }
};
