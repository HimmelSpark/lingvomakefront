import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user'
import shared from './modules/shared'
import course from './modules/course'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
	shared,
	course
  }
});