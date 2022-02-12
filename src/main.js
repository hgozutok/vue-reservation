import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./index.css";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .component("Dialog", Dialog)
  .mount("#app");
