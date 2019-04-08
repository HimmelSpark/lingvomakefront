import store from "../store/index";

export default function (to, from, next) {
  const splitedPath = to.path.split('/');
  console.log("loadTasksGuard", splitedPath);
  store.dispatch('loadCourses')
      .then(() => {
          store.dispatch('loadUnitById', {next: next, id: parseInt(splitedPath[splitedPath.length - 1])})
              .then(() => {
                  store.dispatch('loadTasksByUnit', {next: next, id: parseInt(splitedPath[splitedPath.length - 1])});
              });
      });
}
