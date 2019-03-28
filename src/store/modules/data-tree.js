import {HTTP} from "../../network/http-common";

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
            imgSrc: "https://ak2.picdn.net/shutterstock/videos/1731232/thumb/1.jpg",
            type: "unit",
            children: []
          },
          {
            id: 100500,
            name: "Unit 2",
			description: "another TOEFL unit",
			imgSrc: "https://ak2.picdn.net/shutterstock/videos/1731232/thumb/1.jpg",
            type: "unit",
            children: []
          },
          {
            id: 1251,
            name: "Unit 3",
            description: "third TOEFL unit",
			imgSrc: "https://ak2.picdn.net/shutterstock/videos/1731232/thumb/1.jpg",
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
        position: "1",
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
		children: []
	  };
      state.items.push(newCousre);
    }
  },
  actions: {
    setSelected({ commit }, payload) {
      if (payload !== null) {
        commit("setSelected", payload);
      }
    },
    async createCourse({commit}, payload) {
      if (payload != null) {
		commit('clearError');
		commit('setLoading', true);
		console.log(payload);
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
