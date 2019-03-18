export default {
  state: {
    selected: null,
	items: [
		{
			id: 2,
			name: 'TOEFL iBT',
			description: 'This course is for those who pursue to get away from Russia and find better life in the USA',
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
			type: 'course',
			children: [
			  {
				id: 9,
				name: 'Unit 1',
				type: 'unit'
			  }
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
	    commit('setSelected', payload)
	  }
	}
  },
  getters: {
    items(state) {
      return state.items
	},
	selected(state) {
      return state.selected
	}
  }
}