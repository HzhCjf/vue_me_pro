import { request} from "@/request";

// 请求搜索页详情
export const reqSearchInfo = (data)=>{
    return request.post(`/api/list`,data)
}