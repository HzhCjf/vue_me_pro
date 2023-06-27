import { request } from "@/request";

// 1.请求商品详情数据
export const reqGoodDetail = (skuId)=>{
    return request.get(`/api/item/${skuId}`)
}