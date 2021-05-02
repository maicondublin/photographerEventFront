import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Events from '../views/Events.vue'

Vue.use(VueRouter)

const routes = [ //screen rendering routes
    {
        path: '/', //the '/' route is called standard, when accessing the application link, in our case we want it to go to the login screen
        name: 'Login',
        component: Login  // component is the vue file (screen) that will render
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