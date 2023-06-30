import { request ,requestMock} from "@/request";

// 1.请求交易页数据
export const reqTradeInfo = ()=>{
    return request.get(`/api/order/auth/trade`)
}

// 2.请求地址
export const reqAddress = ()=>{
    return requestMock.get(`/address/list`)
}

// 3.请求提交订单
export const submitOrder = (tradeNo,tradeList)=>{
    return request.post(`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,tradeList)
}