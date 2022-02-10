import React, {lazy, ReactElement, ReactNode, Suspense} from "react";


const Login = lazy(() => import("../page/Login"));

import Nav from "../component/Nav";
import {CustomerRouteObject} from "./useRoutes";
const NotFound = lazy(() => import("../page/NotFound"));

const lazyLoad = (node: ReactNode): ReactElement => {
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
                element: lazyLoad(<NotFound/>)
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
export default routes

