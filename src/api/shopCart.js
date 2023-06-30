import { request } from "@/request";

//1. 请求购物车列表
export const reqShopCartList = () => {
    return request.get(`/api/cart/cartList`)
}

//2. 切换商品选中状态
export const reqCheckCart = (skuID, isChecked) => {
    return request.get(`/api/cart/checkCart/${skuID}/${isChecked}`);
};

//3. 删除购物车商品
export const reqDeleteCart = (skuId) => {
    return request.delete(`/api/cart/deleteCart/${skuId}`);
};

//4. 批量选中购物车
export const reqBatchCheckCart = (isChecked, skuIdList) => {
    return request.post(`/api/cart/batchCheckCart/${isChecked}`, skuIdList);
};

//5. 删除所有选中商品
export const reqBatchDelete = (skuIdList) => {
    return request.post(`/api/cart/batchDeleteCart`, skuIdList);
};