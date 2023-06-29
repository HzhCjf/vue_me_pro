import { request } from "@/request";

// 1.请求交易页数据
export const reqTradeInfo = ()=>{
    return request.get(`/api/order/auth/trade`)
}