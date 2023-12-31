import axios from "axios";
const request  = axios.create({
    // 目标地址
    baseURL:'/',
    // 请求超时时间
    timeout:10000,
    // 请求头信息
    headers:{}
})

// 请求拦截器
request.interceptors.request.use((config)=>{
    return config
})

// 响应拦截器
request.interceptors.response.use((response)=>{
    // 有时候请求成功了也不一定是我们想要的数据,所以要后端返回的状态是200才是我们要的数据
    if(response.data.code === 200){
        // 返回数据
        return response.data.data
    }else{
        return response.Promise(response.data)
    }
},(error)=>{
    return Promise.reject(error)
})

export default request