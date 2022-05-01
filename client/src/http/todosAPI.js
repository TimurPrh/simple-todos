import {$authHost} from "./index";

export const createTodo = async (text) => {
    const {data} = await $authHost.post('api/todos', {text})
    return data
}

export const updateTodo = async (id, {favorite}) => {
    const {data} = await $authHost.post(`api/todos/${id}`, {favorite})
    return data
}

export const destroyTodo = async (id) => {
    const {data} = await $authHost.delete(`api/todos/${id}`)
    return data
}

export const fetchTodos = async () => {
    const {data} = await $authHost.get('api/todos')
    return data
}