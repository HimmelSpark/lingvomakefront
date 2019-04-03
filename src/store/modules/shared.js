export default {
  state: {
    loading: false,
    error: null,
    renderPermission: false,
    listDrawer: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setRenderPermission(state, payload) {
      state.renderPermission = payload;
    },
	setListDrawer(state, tf) {
      state.listDrawer = tf;
    }
  },
  actions: {
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },
    setError({ commit }, payload) {
      commit("setError", payload);
    },
    clearError({ commit }) {
      commit("clearError");
    },
    setListDrawer({commit}, tf) {
      commit('setListDrawer', tf)
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    renderPermission: state => state.renderPermission,
    isListDrawer(state) {
      return state.listDrawer;
    }
  }
};
