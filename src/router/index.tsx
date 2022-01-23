import type {RouteObject} from "react-router-dom";
import {lazy} from "react";
const Nav =  lazy(()=>import("../component/Nav"));

const routerConfig: RouteObject[] = [
    {
        path:"/",
        element:<Nav/>,
    }
]

export default routerConfig