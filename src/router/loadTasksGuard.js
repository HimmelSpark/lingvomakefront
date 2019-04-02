import store from "../store/index";

export default function (to, from, next) {
  const splitedPath = to.path.split('/');
  console.log("loadTasksGuard", splitedPath);
  //TODO проверить, звгружены ли юниты, если нет, то загрузить
}