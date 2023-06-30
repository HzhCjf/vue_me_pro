const tokenKey = "token";

// 获取本地存储的token,如果没有就是空字符串
export function getToken(){
   return  localStorage.getItem(tokenKey) || ''
}

// 修改本地存储的token
export function setToken(token){
    localStorage.setItem(tokenKey,token)
}

// 删除本地存储的token
export function removeToken(){
    localStorage.removeItem(tokenKey)
}


