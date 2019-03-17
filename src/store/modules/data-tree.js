export default {
  state: {
    selected: null,
	items: [
	  {
		id: 1,
		name: 'Courses :',
		type: null,
		children: [
		  {
			id: 2,
			name: 'TOEFL iBT',
			type: 'course',
			children: [
			  {
				id: 3,
				name: 'Unit 1',
				type: 'unit'
			  }
			]
		  },
		  {
			id: 4,
			name: 'CAE',
			type: 'course',
			children: [
			  {
				id: 5,
				name: 'Unit 1',
				type: 'unit',
				children: [
				  {
					id: 6,
					name: 'Psychology',
					type: 'task'
				  },
				  {
					id: 7,
					name: 'Theology',
					type: 'task'
				  }
				]
			  }
			]
		  },
		  {
			id: 8,
			name: 'GMATH',
			children: [
			  {
				id: 9,
				name: 'Unit 1',
			  }
			]
		  },
		]
	  },
	]
  },
  mutations: {
    setSelected(state, payload) {
      state.selected = payload
	}
  },
  actions: {
	setSelected({commit}, payload) {
	  if (payload !== null) {
	    commit('', payload)
	  }
	}
  },
  getters: {
    items(state) {
      return state.items
	}
  }
}