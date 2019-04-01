import store from "../store/index";

export default function (to, from, next) {
  const splitedPath = to.path.split('/');
  console.log(splitedPath);
  if (splitedPath.length !== 4) {
    store.dispatch('setError', "Unexpected Error");
    next(false)
  } else {

    for (let i = 0; i < store.getters.items.length; i++) {
      if (store.getters.items[i].id === parseInt(splitedPath[splitedPath.length - 1])) {
		store.dispatch('loadUnitsByCourse', {next: next, payload: store.getters.items[i]});
		break;
	  }
	}

  }
}