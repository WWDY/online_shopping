import React, {lazy, ReactElement, ReactNode, Suspense} from "react";
import {useRouteGuard} from "./hook";

const Login = lazy(() => import("../page/Login"));

import Nav from "../component/Nav";
import {CustomerRouteObject} from "./useRoutes";
const NotFound = lazy(() => import("../page/NotFound"));

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
        element: <Nav/>,
        meta: {
            title: "首页",
            auth: false
        },
        children: [
            {
                path: '/404',
                element: lazyLoad(<NotFound/>),
            },
            {
                path: '/login',
                element: lazyLoad(<Login/>),
                meta: {
                    title: "登录",
                    auth: true
                }
            },
        ]
    },
]

useRouteGuard((data: CustomerRouteObject): ReactElement=>{

    const {meta,element} = data

    if (meta?.auth) {
        return <NotFound/>
    }
    return element;
})

export default routes
