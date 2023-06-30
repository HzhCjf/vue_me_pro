import { request } from "@/request";
// 请求验证码
export const reqCode = (phone)=>{
    return request.get(`/api/user/passport/sendCode/${phone}`)
}

// 请求注册
export const reqRegister = (userInfo)=>{
    return request.post(`/api/user/passport/register`,userInfo)
}

// 请求登录
export const reqLogin = (userInfo)=>{
    return request.post(`/api/user/passport/login`,userInfo)
}

// 获取用户信息
export const reqUserInfo = ()=>{
    return request.get(`/api/user/passport/auth/getUserInfo`)
}

// 请求退出登录
export const reqLogout = () => {
    return request.get(`/api/user/passport/logout`);
  };