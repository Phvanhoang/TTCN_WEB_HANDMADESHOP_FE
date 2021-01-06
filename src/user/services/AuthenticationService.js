// import axios from "axios";
// import config from "../config/config"

// async function requestLogin(user) {
//     config()
//     const body = {
//       tenDangNhap: user.tenDangNhap,
//       matKhau: user.matKhau,
//     };
//     return await axios({
//       headers: { "Access-Control-Allow-Origin": "*" },
//       method: "POST",
//       url: "/login",
//       data: body,
//     });
// }
// export default requestLogin;
import jwt_decode from 'jwt-decode'
import React from 'react'
import axios from "axios";
import config from "../config/config"
import {  useHistory } from "react-router-dom";


function getToken() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser === null) return null;
    if (currentUser.token === undefined) return null;
    return currentUser.token;
}

function getTokenExpirationDate(token) {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
}

function isTokenExpired(token) {
    if(!token) token = getToken();
    if(!token) return true;
    const date = getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
}

function isLoggedIn() {
    return !isTokenExpired();
}

function getUserId() {
    if (isLoggedIn()) return JSON.parse(localStorage.getItem('user')).id
    else return null;
}

async function requestLogin(user)  {
    config()
    const body = {
        tenDangNhap: user.tenDangNhap,
        matKhau: user.matKhau,
    };
    return await axios({
        headers: { "Access-Control-Allow-Origin": "*" },
        method: "POST",
        url: "/login",
        data: body,
    });
}

function logout(){
    localStorage.removeItem('user');
    // history = useHistory()
    // history.push("/")
}

export {requestLogin, logout, isLoggedIn, getTokenExpirationDate, getToken, getUserId};