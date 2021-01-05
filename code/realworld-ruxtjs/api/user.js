import { request } from '@/plugins/request.js'

//用户登录
export const login = data => {
    return request({
        method: 'POST',   //注意：这里没有“s”
        url: '/api/users/login',
        data
    })
}
//用户注册
export const register = data => {
    return request({
        method: 'POST',   //注意：这里没有“s”
        url: '/api/users',
        data
    })
}