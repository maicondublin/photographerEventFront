import axios from 'axios'

const setAuthorization = config => {
    if(config.url == '/login') return config
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user) window.location.href = '/' //localstorage é um cache de armazenamento do navegador 
    config.headers.authorization = `Bearer ${user.token}`
    return config
}

const createHttpRequest = ({baseURL}) => { // criando instancia de requisição para baseURL do server side
    return axios.create({baseURL})
} 

const request = createHttpRequest({baseURL: process.env.VUE_APP_API_URI})

request.interceptors.request.use(setAuthorization) // middleware de front-end para setar o token de usuáio na requisição que vai para o back-end

export default request