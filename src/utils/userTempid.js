import { nanoid } from "nanoid";
//定义本地存储的key
const userTempId = "userTempId";

// 获取临时Id
export default function getUserTempId() {
  //先判断本地存储中是否存在临时id
  if (localStorage.getItem(userTempId)) {
    return localStorage.getItem(userTempId);
  } else {
    const id = nanoid();
    localStorage.setItem(userTempId, id);
    return id;
  }
}
