import { nanoid } from "nanoid";

const userTempId = 'userTempId'

export  function getUserTempId(){
    if(localStorage.getItem(userTempId)){
        return localStorage.getItem(userTempId)
    }else{
        const id = nanoid()
        localStorage.setItem(userTempId,id)
        return id
    }
}