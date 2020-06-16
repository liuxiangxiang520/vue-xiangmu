//包含哪一些工具函数的模块

import {v4 as uuidv4} from 'uuid'
//得到一个用户临时的ID
//从localstorage中读取，如果有返回就返回它
//如果没有，使用uuid生成一个新的，保存到localstorage，关闭浏览器或者电脑数据仍然存在
export function getUserTempId(){
    //从localstorage中读取，有就返回
    let getUserTempId = localStorage.getItem('USER_TEMP_ID_KEY')
    //如果没有，使用uuid生成一个新的，保存到localstorage
    if(!userTempId){
        userTempId = uuidv4()
        //保存到localStorage中
        localStorage.setItem('USER_TEMP_ID_KEY',userTempId)
    }
    //返回
    return userTempId
}

//保存用户信息到local
export function saveUserInfo(userInfo){
    window.localStorage.setItem('USER_INFO_KEY',JSON.stringify(userInfo))
}

//读取local中保存的用户信息，返回userInfo对象或者空对象
export function getUserInfo(){
    return JSON.parse(window.localStorage.getItem('USER_INFO_KEY')) || {}
}

//删除local中保存的用户信息
export function removeUserInfo(){
    window.localStorage.removeItem('USER_INFO_KEY')
}