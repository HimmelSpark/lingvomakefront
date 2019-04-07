import { HTTP } from "../../network/http-common";
export default {
  state: {
    courses: [
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
      },
      {
        title: "Favorite sht",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
      }
    ]
  },
  mutations: {
    setCourses(state, payload) {
      state.courses = payload;
    },
    addCourse(state, payload) {
        console.log('cource add cource');
      state.courses.push(payload);
    },
  },
  actions: {

  },
  getters: {

  }
};
