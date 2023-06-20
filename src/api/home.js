import { request } from "@/request";

// 请求一级列表
export const reqCategory1List = ()=>{
    return request.get(`/admin/product/getCategory1`)
}

// 请求2级列表,根据1级列表的id进行请求
export const reqCategory2List = (Category1Id)=>{
    return request.get(`/admin/product/getCategory2/${Category1Id}`)
}

// 请求3级列表,根据2级列表的id进行请求
export const reqCategory3List = (Category2Id)=>{
    return request.get(`/admin/product/getCategory3/${Category2Id}`)
}