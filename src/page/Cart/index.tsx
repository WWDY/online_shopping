import React, {ReactNode, useEffect, useState} from 'react';
import ShoppingCart from "../../component/ShoppingCart";
import axiosInstance, {ResultVO} from "../../axios/axios";
import Header from "../../component/Header";
import {Footer} from "antd/es/layout/layout";
import {Button, Card, Col, Form, Input, message, Row, Steps} from "antd";
import CartOrder from "../../component/CartOrder";
import styles from './index.module.less'
import {ShoppingCartOutlined, HomeOutlined} from "@ant-design/icons";

const Cart = () => {

    const [cartList, setCartList] = useState<any[]>([])
    const [cartOrder, setCartOrder] = useState<any>({price: 0, discountPrice: 0})

    const [current, setCurrent] = React.useState(0);


    const onChange = (current: number) => {
        setCurrent(current);
    };


    const getCartList = () => {
        axiosInstance('/front/shop/cart', {
            method: 'GET'
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setCartList(resVO.data)
            }
        })
    }

    const removeCart = (id: number) => {
        axiosInstance('/front/cart/', {
            method: 'DELETE',
            data: JSON.stringify({shopId: id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                const findIndex = cartList.findIndex(item => item.id === id);
                cartList.splice(findIndex, 1);
                message.success(resVO.message).then()
                setCartList([...cartList])
            } else {
                message.error(resVO.message).then()
            }
        })
    }

    const onFinish = (values: any) => {
        const shopPayInfoList: Array<{id: number, count: number}> = []
        cartList.forEach(item => {
            shopPayInfoList.push({id: item.id, count: item.count || 1})
        })
        const res = {
            shopPayInfoList,
            ...values
        }
        axiosInstance('/front/alipay/pay',{
            method:'POST',
            data: JSON.stringify(res)
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                const open = window.open("", "_self");
                open?.document.write(resVO.data);
                open?.focus()
            }else{
                message.error(resVO.message).then()
            }
        }).catch()
    }

    const address = () => {
        setCurrent(1)
    }

    useEffect(() => {
        getCartList()
    }, [])

    useEffect(() => {
        const price: number = cartList.map(cart => {
            return cart.price * (cart.count || 1)
        }).reduce((a, b) => a + b, 0)
        const discountPrice: number = cartList.map(cart => {
            return cart.discountPrice * (cart.count || 1)
        }).reduce((a, b) => a + b, 0)
        setCartOrder({price: price.toFixed(2), discountPrice: discountPrice.toFixed(2)})
    }, [cartList])


    const steps = [
        {
            title: '购物车',
            icon: <ShoppingCartOutlined/>,
            content: <Row>
                <Col span={15}>
                    {
                        cartList.map((cart, index) => {
                            return (
                                <ShoppingCart getValue={(value) => {
                                    cartList[index].count = value
                                    setCartList([...cartList])
                                }} removeItem={removeCart} key={index} data={cart}/>
                            )
                        })
                    }
                </Col>
                <Col span={9} style={{padding: '20px 45px'}}>
                    <CartOrder address={address} data={cartOrder}/>
                </Col>
            </Row>,
        },
        {
            title: '地址',
            icon: <HomeOutlined/>,
            content: <Card style={{width: '600px', borderRadius: 10, margin: 20}} title={'邮寄地址'}>
                <Form
                    labelCol={{span: 4}}
                    onFinish={(value) => {onFinish(value)}}
                >
                    <Form.Item
                        rules={
                            [
                                {
                                    required: true,
                                    message: '姓名不能为空'
                                }
                            ]
                        }
                        name={'name'}
                        label={'姓名'}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        rules={
                            [
                                {
                                    required: true,
                                    message: '电话不能为空'
                                }
                            ]
                        }
                        name={'phone'}
                        label={'电话'}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        rules={
                            [
                                {
                                    required: true,
                                    message: '收货地址不能为空'
                                }
                            ]
                        }
                        name={'address'}
                        label={'收货地址'}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{float:'right'}} type={"primary"} htmlType={'submit'}>付款</Button>
                    </Form.Item>
                </Form>
            </Card>,
        }
    ];

    return (
        <div>
            <Header/>
            <div className={styles.content} style={{minHeight: 'calc(100vh - 180px)'}}>
                <Steps
                    className={"site-navigation-steps"}
                    current={current}
                    style={
                        {
                            width: '500px',
                            margin: '30px 20px 10px 20px'
                        }
                    }
                >
                    {steps.map(item => (
                        <Steps.Step
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </Steps>
                <div>{steps[current].content}</div>
            </div>
            <Footer style={{textAlign: 'center'}}>Copyright &copy;2022 Created by WWDY</Footer>
        </div>
    );
};

export default Cart;