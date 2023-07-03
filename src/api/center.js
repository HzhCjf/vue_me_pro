import { request } from "@/request";

export const reqOrderList = (page, limit) => {
  return request.get(`/api/order/auth/${page}/${limit}`);
};