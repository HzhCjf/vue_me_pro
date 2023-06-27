import { request } from "@/request";

//1. 根据skuId请求详情
export const reqGoodDetail = (skuId) => {
  return request.get(`/api/item/${skuId}`);
};

//2.添加购物车和修改购物车数量
export const reqAddCartOrChangeNum = (skuId, skuNum) => {
    return request.post(`/api/cart/addToCart/${skuId}/${skuNum}`);
};