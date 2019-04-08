import store from "../store/index";

export default function (to, from, next) {
    console.log('loadStudentsGuard');
    store.dispatch('loadCourses')
        .then(() => {
            store.dispatch('loadGroups')
                .then(() => {
                    store.dispatch('loadAllStudents').then(
                        () => {
                            next();
                    });
                });
        });
}
