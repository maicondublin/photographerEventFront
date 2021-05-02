import axios from 'axios'

const setAuthorization = config => {
    if(config.url == '/login') return config
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user) window.location.href = '/' //localstorage is a browser storage cache
    config.headers.authorization = `Bearer ${user.token}`
    return config
}

const createHttpRequest = ({baseURL}) => { // creating request instance for server side baseURL
    return axios.create({baseURL})
} 

const request = createHttpRequest({baseURL:'http://localhost:3001'})

request.interceptors.request.use(setAuthorization) //  front-end middleware to set the user token in the request that goes to the back-end

export default request