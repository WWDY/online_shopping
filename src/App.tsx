import React from 'react'
import 'antd/dist/antd.less'
import './App.css'
import {Outlet} from "react-router-dom";
import useRoutes from "./router/useRoutes";
import routes from "./router";
import {GlobalScrollbar} from "mac-scrollbar";


function App() {

    return (
        <div className={"App"}>
            <GlobalScrollbar/>
            {
                useRoutes(routes)
            }
            <Outlet/>
        </div>
    )
}

export default App
