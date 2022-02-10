import React from 'react'
import 'antd/dist/antd.less'
import './App.css'
import {Outlet} from "react-router-dom";
import useRoutes from "./router/useRoutes";
import routes from "./router";


function App() {

    return (
        <div className={"App"}>
            {
                useRoutes(routes)
            }
            <Outlet/>
        </div>
    )
}

export default App
