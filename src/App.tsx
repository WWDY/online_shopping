import React from 'react'
import 'antd/dist/antd.less'
import './App.css'
import {useRoutes, Outlet, Link} from "react-router-dom";
import routerConfig from "./router";
import {Button} from "antd";

function App() {

    const routes = useRoutes(routerConfig);

    return (
        <div className={"App"}>
            <React.Suspense fallback={<></>}>
                {routes}
            </React.Suspense>
            <Outlet/>
        </div>
    )
}

export default App
