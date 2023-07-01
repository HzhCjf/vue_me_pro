import { request } from "@/request";

// 请求订单列表
export const reqOrderList = (page, limit) => {
  return request.get(`/api/order/auth/${page}/${limit}`);
};