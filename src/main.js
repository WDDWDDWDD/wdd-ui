import Vue from 'vue'
Vue.config.devtools = true;

import App from './App'
new Vue({
  render: h => h(App)
}).$mount('#app')