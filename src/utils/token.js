const tokenkey = 'token'

// 获取本地存储的token,如果没有就是空字符串
export function getToken(){
    localStorage.getItem(tokenkey) || ''
}

// 修改本地存储的token
export function setToken(token){
    localStorage.setItem(tokenkey,token)
}

// 删除本地存储的token
export function removeToken(){
    localStorage.removeItem(tokenkey)
}