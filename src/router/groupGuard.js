import store from "../store";

export default function (to, from, next) {
    const splitedPath = to.path.split('/');
    console.log("groupGuard", splitedPath);
    store.dispatch('loadCourses')
        .then(() => {
            store.dispatch('loadGroups')
                .then(() => {
                    store.dispatch("loadAllStudentsByGroupId", {next: next, id: parseInt(splitedPath[splitedPath.length - 1])});
                })
                .catch(e => console.error(e));
        });

}
