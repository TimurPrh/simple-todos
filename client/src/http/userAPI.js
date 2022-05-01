import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (nickName, password) => {
    const {data} = await $host.post('api/user/registration', {nickName, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (nickName, password) => {
    const {data} = await $host.post('api/user/login', {nickName, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
    return null
}