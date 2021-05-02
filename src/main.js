import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import vuetify from '../plugins/vuetify'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  router, // adding the routes in the front-end application
  vuetify,
  render: h => h(App),
}).$mount('#app')
