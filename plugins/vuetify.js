import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' //arquivo que referencia estilos após buildar aplicação
import "@mdi/font/css/materialdesignicons.css" // repositório de icones

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)