import React, {useEffect} from 'react';
import Header from "../../component/Header";
import {Footer} from "antd/es/layout/layout";
import MyOrder from "../../component/MyOrder";
import axiosInstance, {ResultVO} from "../../axios/axios";
import {message} from "antd";

const Order = () => {

    const [orderList, setOrderList] = React.useState<any[]>([]);

    const getOrderList = () => {
        axiosInstance('/front/order/',{
            method: 'GET'
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setOrderList(resVO.data);
            }else{
                message.error(resVO.message).then();
            }
        }).catch()
    }

    useEffect(() => {
        getOrderList();
    }, []);


    return (
        <div>
            <Header/>
            <div style={{minHeight: 'calc(100vh - 180px)'}}>
                {
                    orderList.map((item, index) => {
                        return <MyOrder key={index} data={item}/>
                    })
                }
            </div>
            <Footer style={{textAlign: 'center'}}>Copyright &copy;2022 Created by WWDY</Footer>
        </div>
    );
};

export default Order;