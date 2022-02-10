// @flow
import * as React from 'react';
import {Link} from "react-router-dom";
import {Button} from "antd";


const NotFound = () => {
    return (
        <div>
            <h1>404 Page</h1>
            <Link to={"/"}>
                <Button type={"primary"}>首页</Button>
            </Link>
        </div>
    );
};

export default NotFound