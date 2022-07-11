import axios from "axios";

const baseURL = 'http://todos.na4u.ru'

const $host = axios.create({ baseURL })

const $authHost = axios.create({ baseURL })

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}