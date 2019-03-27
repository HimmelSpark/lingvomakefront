import store from "../store";
import bus from "../modules/bus";

export default function(to, from, next) {
  if (store.getters.user) {
    console.log('doubleGuard if before bus')
    next("/");
  } else {
    console.log('doubleGuard else before bus')
    bus.on('onAuth', data => {
      console.log('doubleGuard in bus')
      const user = data.payload;
      if (user) {
        console.log('doubleGuard in bus if')
        next("/");
      } else {
        console.log('doubleGuard in bus else')
        next();
      }
    }); 
  }
}
