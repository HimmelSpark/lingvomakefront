import store from "../store/index";
import bus from "../modules/bus";
export default function(to, from, next) {
  if (store.getters.user) {
    console.log('authGuard - if before bus debug');
    next();
  } else {
    console.log('authGuard - else before bus debug');
    bus.on('onAuth', data => {
      const user = data.payload;
      if (user) {
        console.log('authGuard - bus if debug');
        next();
      } else {
        console.log('authGuard - bus else debug');
        next('/login?authError=true');
      }
    });
  }
}
