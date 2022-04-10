import React, {lazy, ReactElement, ReactNode, Suspense} from "react";
import {useRouteGuard} from "./hook";



import {CustomerRouteObject} from "./useRoutes";
import Index from '../page/Index'
import Detail from "../page/Detail";
import {LOGIN_GET_TOKEN, LOGIN_URL, SESSION_STORAGE_CURRENT_ROUTE_KEY, SESSION_STORAGE_TOKEN_KEY} from "../constant";
import Login from "../component/Login";
import Search from "../page/Search";
import WishList from "../page/WishList";
import Cart from "../page/Cart";
import Order from "../page/Order";

export const lazyLoad = (node: ReactNode): ReactElement => {
    return (
        <Suspense fallback={<>111</>}>
            {node}
        </Suspense>
    )
}

const routes: CustomerRouteObject[] = [
    {
        path: '/',
        element: <Index />,
        meta: {
            title: "WWDY商城",
            auth: true
        }
    },
    {
        path: '/detail/:id',
        element: <Detail/>,
        meta: {
            title: '商品详情',
            auth: true
        }
    },
    {
        path: '/cart',
        element: <Cart/>,
        meta: {
            title: '购物车',
            auth: true
        }
    },
    {
        path: '/login',
        element: <Login/>,
        meta: {
            title: '登录',
            auth: false
        }
    },
    {
        path: '/search',
        element: <Search/>,
        meta: {
            title: '商品检索',
            auth: true
        }
    },
    {
        path: '/wish-list',
        element: <WishList/>,
        meta: {
            title: '我的收藏',
            auth: true
        }
    },
    {
        path: '/order',
        element: <Order/>,
        meta: {
            title: '我的订单',
            auth: true
        }
    }
]

useRouteGuard((data: CustomerRouteObject): ReactElement=>{

    const {meta,element} = data

    if (meta?.auth) {
        if(!localStorage.getItem(SESSION_STORAGE_TOKEN_KEY)){
            localStorage.setItem(SESSION_STORAGE_CURRENT_ROUTE_KEY,data.path!)
            window.location.replace(encodeURI(LOGIN_URL + LOGIN_GET_TOKEN))
            return <></>
        }else{
            return element
        }
    }else{
        return element
    }
})

export default routes
