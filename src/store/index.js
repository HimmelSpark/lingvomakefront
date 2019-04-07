import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import shared from "./modules/shared";
import dataTree from "./modules/data-tree";
import student from "./modules/student";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    shared,
    student,
    dataTree
  }
});
