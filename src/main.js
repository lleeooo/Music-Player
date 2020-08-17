import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import 'assets/stylus/index.styl'
import 'lib-flexible'
fastclick.attach(document.body)


Vue.config.productionTip = false

Vue.use(lazyload , {
  loading: require('./assets/img/Occupation.png')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
