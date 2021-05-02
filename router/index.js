import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Events from '../views/Events.vue'

Vue.use(VueRouter)

const routes = [ // rotas de renderização de telas
    {
        path: '/', // a rota  '/' é chamada padrão, ao acessar o link da aplicação, no nosso caso queremos que vá para tela de login
        name: 'Login',
        component: Login  // component é a o arquivo vue(tela) que vai renderizar
    },
    {
        path: '/events',
        name: 'Events',
        component: Events
    }
]

const router = new VueRouter({

    mode: 'history',
    base: process.env.BASE_URL,
    routes

})

export default router