export default {
  state: {
    selectedSTUD: null,
    groups: [
	  {
	    id: 1,
		name: 'Group TOEFL B2',
		children: [
		  {id: 2, name: 'Adamyan Petros Samwelovich', imgSrc: ''},
		  {id: 3, name: 'Britikov Konstantin Krymchanovich', imgSrc: ''}
		]
	  },
	  {
	    id: 4,
		name: 'Group IELTS B1',
		children: [
		  {id: 5, name: 'TchuWashOFF Jahor Kirovich', imgSrc: ''},
		  {id: 6, name: 'VanyashKEEN Jury^2', imgSrc: ''}
		]
	  },
	  {id: 6, name: 'Group CAE C1'},
	  {id: 7, name: 'Other group'},
	]
  },
  mutations: {
    setSelectedSTUD(state, payload) {
      state.selectedSTUD = payload
	}
  },
  actions: {
	setSelectedSTUD({commit}, payload) {
	  commit('setSelectedSTUD', payload)
	}
  },
  getters: {
    getGroups(state) {
      return state.groups
	},
	getSelectedSTUD(state) {
      return state.selectedSTUD
	}
  }
}