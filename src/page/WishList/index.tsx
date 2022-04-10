import React, {useEffect, useState} from 'react';
import Header from "../../component/Header";
import {Footer} from "antd/es/layout/layout";
import axiosInstance, {ResultVO} from "../../axios/axios";
import {Divider, message} from "antd";
import ShopCard from "../../component/ShopList";

const WishList = () => {

    /**
     * state
     */
    const [data, setData] = useState<any[]>([]);


    /**
     * function
     */
    const getData = () => {
        axiosInstance('/front/shop/wish-list',{
            method: 'GET'
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setData(resVO.data);
            }else{
                message.error(resVO.message).then()
            }
        }).catch()
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Header/>
            <h1 style={{margin:20}}>我的收藏</h1>
            <Divider/>
            <div style={{minHeight: 'calc(100vh - 180px)'}}>
                {
                    data.map((item,index) => {
                        return (
                            <ShopCard data={item} key={index}/>
                        )
                    })
                }
            </div>
            <Footer style={{textAlign: 'center'}}>Copyright &copy;2022 Created by WWDY</Footer>
        </div>
    );
};

export default WishList;