import { request } from "@/request";

// 请求订单信息
export const reqPayInfo = (orderId)=>{
    return request.get(`/api/payment/weixin/createNative/${orderId}`)
}

// 请求订单状态
export const reqPayStatus  = (orderId)=>{
    return request.get(`/api/payment/weixin/queryPayStatus/${orderId}`)
}