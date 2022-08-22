import Vue from "vue";
import App from "./App.vue";
import "/node_modules/flag-icons/css/flag-icons.min.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
