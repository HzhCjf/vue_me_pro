import { request } from "@/request";

//1. 请求购物车列表
export const reqShopCartList = () => {
  return request.get(`/api/cart/cartList`)
}