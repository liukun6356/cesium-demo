import Vue from 'vue';
import App from './App.vue';
import router from './router';
// element-ui
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";

// less样式 
import './assets/css/global.less';

Vue.config.productionTip = false;
Vue.prototype.$baseUrl = process.env.VUE_APP_BASEURL;

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
