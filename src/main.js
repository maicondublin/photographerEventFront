import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import vuetify from '../plugins/vuetify'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  router, // adicionando as rotas na aplicação front-end
  vuetify,
  render: h => h(App),
}).$mount('#app')
