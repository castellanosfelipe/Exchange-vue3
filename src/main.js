import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/css/tailwind.css";

import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import { AtomSpinner, LoopingRhombusesSpinner } from "epic-spinners";

createApp(App)
  .use(router)
  .use(VueChartkick)
  .component("AtomSpinner", AtomSpinner)
  .component("LoopingRhombusesSpinner", LoopingRhombusesSpinner)

  .mount("#app");
