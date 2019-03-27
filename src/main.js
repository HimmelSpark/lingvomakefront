import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import axios from "axios";
import VueAxios from "vue-axios";
import ColorPicker from "./components/extra/Color";
import { HTTP } from "./network/http-common";
import bus from "./modules/bus";


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component("color-picker", ColorPicker);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.commit('setRenderPermission', false);
    const promise = HTTP.get('/admin/info');
    promise.then(
      resp => {
        console.log(resp.data);
        this.$store.commit('setUser', resp.data);
        bus.emit('onAuth', resp.data);
        this.$store.commit('setRenderPermission', true);
      }
    ).catch(
      () => {
        bus.emit('onAuth', null);
        this.$store.commit('setRenderPermission', true);
      }
    )
  }
}).$mount("#app");
