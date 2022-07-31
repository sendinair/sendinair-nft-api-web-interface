import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css"
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleNotch,
  faCheck,
  faChevronDown,
  faChevronUp,
  faFilter,
  faPlus,
  faMinus,
  faSignalStream,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCircleNotch,
  faCheck,
  faChevronDown,
  faChevronUp,
  faFilter,
  faPlus,
  faMinus,
  faXmark,
  faTwitter,
  faDiscord
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Toast, {
  draggable: false,
  timeout: 2000,
  position: POSITION.BOTTOM_CENTER,
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
