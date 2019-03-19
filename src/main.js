import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    //TODO проверить хранится ли локально пользователь
    //TODO если нет, то залогинить
  }
}).$mount("#app");
