import axios from "axios";

const request  = axios.create({
    // 目标地址
    baseURL:'/dev-api1',
    // 请求超时时间
    timeout:10000,
    // 请求头信息
    headers:{}
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use((response)=>{
    return response.data
})

export default request