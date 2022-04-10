import axios from "axios";
import {LOGIN_GET_TOKEN, LOGIN_URL, SESSION_STORAGE_CURRENT_ROUTE_KEY, SESSION_STORAGE_TOKEN_KEY} from "../constant";

const BASE_URL = 'http://localhost:10000/api';
const AUTH_HEADER = "Authorization";
const HEADER_START = "Bearer ";


const getToken = (): string => {
    const token = localStorage.getItem(SESSION_STORAGE_TOKEN_KEY);
    if (token !== null) {
        return token
    }
    return '';
}

export interface ResultVO{
    "code": number,
    "data": any,
    "success": boolean,
    "error": object,
    "message": string
}

export interface PageVO{
    content: any[];
    page: number
    size: number
    total: number
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 36000,
    withCredentials: true
});

axiosInstance.interceptors.request.use(config=>{
    config.headers = {
        [AUTH_HEADER]: HEADER_START + getToken(),
        ['Content-Type']: 'application/json;charset=utf-8'
    }
    return config
}, error => {
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use(res => {
    const resVO = res.data as ResultVO;
    if(resVO.code === 10004001){
        localStorage.setItem(SESSION_STORAGE_CURRENT_ROUTE_KEY, window.location.pathname)
        window.location.replace(encodeURI(LOGIN_URL + LOGIN_GET_TOKEN))
    }else {
        return res
    }
})

export default axiosInstance