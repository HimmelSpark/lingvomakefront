import store from "../store/index";

export default function (to, from, next) {
  const splitedPath = to.path.split('/');
  console.log("loadUnitsGuard", splitedPath);

  if (store.getters.items.length === 0) {
    store.dispatch('loadCourses')
		.then(() => {
		  if (splitedPath.length === 4) {
		    loadUnitsByCourseId(next, parseInt(splitedPath[splitedPath.length - 1]));
		  }
		})
  }
  else {
    next()
  }

}

function loadUnitsByCourseId(next, id) {
  for (let i = 0; i < store.getters.items.length; i++) {
	if (store.getters.items[i].id === id) {
	  store.dispatch('loadUnitsByCourse', {next: next, payload: store.getters.items[i]});
	  break;
	}
  }
}
