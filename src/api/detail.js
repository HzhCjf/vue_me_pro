import { request } from "@/request";

// 1.请求商品详情数据
export const reqGoodDetail = (skuId)=>{
    return request.get(`/api/item/${skuId}`)
}

// 请求添加购物车和修改购物车数量
export const  reqAddCartOrChangeNum = (skuId,skuNum)=>{
    return request.post(`/api/cart/addToCart/${skuId}/${skuNum}`)
}