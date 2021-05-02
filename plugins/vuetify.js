import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' //file that references styles after building application
import "@mdi/font/css/materialdesignicons.css" // icon repository

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)