import React from 'react';
import Header from "../../component/Header";
import Nav from "../../component/Nav";
import Content from "../../component/Content";
import {Divider} from "antd";
import {Footer} from "antd/es/layout/layout";

const Index = () => {
    return (
        <div>
          <Header/>
          <Nav />
          <Divider/>
          <h2 style={{padding: '0 calc((100% - 1226px)/2)'}}>商品</h2>
          <Content/>
          <Footer style={{textAlign: 'center'}}>Copyright &copy;2022 Created by WWDY</Footer>
        </div>
    );
};

export default Index;