import styles from './index.module.less'

import React, {ReactNode, useEffect, useState} from 'react';
import {Button, Card, Carousel, Col, Divider, Image, message, Row} from "antd";
import {HeartOutlined, ShoppingCartOutlined, TransactionOutlined, PayCircleOutlined,HistoryOutlined,SafetyCertificateOutlined} from "@ant-design/icons";
import {Footer} from "antd/es/layout/layout";
import {useParams} from "react-router-dom";
import axiosInstance, {ResultVO} from "../../axios/axios";



type ShopDetail = {
    id: number
    title: string
    stock: number
    price: number
    discountPrice: number
    sliderShow: Array<string>
    shopDescription: string
    description: string
    sales: number
    spuId: number
    cartStatus: boolean
    wishListStatus: boolean
}

const ShopDetail = () => {


    /**
     * const hook
     */
    const params = useParams();


    /**
     * state
     */
    const [data,setData] = useState<ShopDetail | undefined>();


    /**
     * function
     */
    const wishList = () => {
        axiosInstance('/front/wishlist/',{
            method: 'POST',
            data: JSON.stringify({shopId: data?.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setData({...data!,wishListStatus: true})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    const removeWishList = () => {
        axiosInstance('/front/wishlist/',{
            method: 'DELETE',
            data: JSON.stringify({shopId: data?.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setData({...data!,wishListStatus: false})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    const addCart = () => {
        axiosInstance('/front/cart/',{
            method: 'POST',
            data: JSON.stringify({shopId: data?.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setData({...data!,cartStatus: true})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    const removeCart = () => {
        axiosInstance('/front/cart/',{
            method: 'DELETE',
            data: JSON.stringify({shopId: data?.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setData({...data!,cartStatus: false})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    const getDetail = () => {
       axiosInstance('/front/shop/'+params.id,{
            method: 'GET'
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setData(resVO.data)
            }else{
                message.error(resVO.message).then()
            }
        }) .catch()
    }

    /**
     * hook
     */
    useEffect(() => {
        getDetail()
    },[])

    return (
        <Col span={19} style={{margin: '0 auto'}}>
            <Card className={styles.detail}>
                <Row>
                    <Col
                        span={10}
                        style={
                            {
                                minHeight: 475,
                                lineHeight: 475,
                                textAlign:'center',
                            }
                        }
                    >
                            <Carousel
                                autoplay={false}
                                effect={"fade"}
                                style={{height: 300,position:"relative",margin:'87.5px 0'}}>
                                {
                                    data?.sliderShow.map((item,index) => {
                                        return (
                                                <Image
                                                    key={index}
                                                    style={{width:'110%'}}
                                                    preview={false}
                                                    src={item}
                                                />
                                        )
                                    })
                                }
                            </Carousel>

                    </Col>
                    <Col
                        span={14}
                    >
                        <h2 style={{color: '#5e5873'}}>{data?.title}</h2>
                        <span className={styles.discountPrice}>￥{data?.discountPrice}</span>
                        <span className={styles.price}>￥{data?.price}</span>
                        <div className={styles.desc}>
                            {data?.description}
                        </div>
                        <span className={styles.stock}>库存：{data?.stock}</span>
                        <span className={styles.sales}>销量：{data?.sales}</span>
                        <span
                            style={
                                {
                                    fontSize: '.9rem',
                                    fontWeight: 700,
                                    display: 'list-item'
                                }
                            }
                        >
                            <ShoppingCartOutlined style={{marginRight: 20, fontSize: '1.3rem'}}/>
                            包邮
                        </span>
                        <span
                            style={
                                {
                                    marginTop: 10,
                                    fontSize: '.9rem',
                                    fontWeight: 700,
                                    display: 'list-item'
                                }
                            }
                        >
                            <TransactionOutlined style={{marginRight: 20, fontSize: '1.2rem'}}/>
                            运费险
                        </span>
                        <Divider/>
                        <Button
                            icon={<ShoppingCartOutlined/>}
                            size={"large"}
                            style={
                                {
                                    backgroundColor: '#6d62e4',
                                    color: '#FFF',
                                    width: 157,
                                    fontWeight: 700,
                                    borderRadius: '6px',
                                    marginRight: 20
                                }
                            }
                            onClick={data?.cartStatus ? removeCart : addCart}
                        >
                            {data?.cartStatus ? '已加入购物车' : '加入购物车'}
                        </Button>
                        <Button
                            icon={<HeartOutlined style={ data?.wishListStatus ? {color:'#ea5455'} : {}}/>}
                            size={"large"}
                            style={
                                {
                                    backgroundColor: '#f7f7f7',
                                    color: '#6e6b7b',
                                    width: 157,
                                    fontWeight: 700,
                                    borderRadius: '6px'
                                }
                            }
                            onClick={ data?.wishListStatus ? removeWishList : wishList }
                        >
                            { data?.wishListStatus ? '已收藏' : '收藏' }
                        </Button>
                        <br/>

                    </Col>
                </Row>
                <div className={styles.middle}>
                    <Row>
                        <Col
                            span={8}
                            style={
                                {
                                    height: 280,
                                    padding: '30px 0'
                                }
                            }
                        >
                            <Middle
                                icon={<SafetyCertificateOutlined />}
                                description={'厂家源头货源正品保障,官方承诺正品，假一赔三,如假包换'}
                                title={'100%正品'}
                            />
                        </Col>
                        <Col
                            span={8}
                            style={
                                {
                                    height: 280,
                                    padding: '30px 0'
                                }
                            }
                        >
                            <Middle
                                icon={<HistoryOutlined />}
                                description={'商家承诺七天无理由退货，商品不影响二次销售的情况下支持7天无理由退货'}
                                title={'7天无理由退货'}
                            />
                        </Col>
                        <Col
                            span={8}
                            style={
                                {
                                    height: 280,
                                    padding: '30px 0'
                                }
                            }
                        >
                            <Middle
                                icon={<PayCircleOutlined/>}
                                description={'下单商家免费赠送运费险，退换货申请运费理赔即可享受运费险'}
                                title={'运费险'}
                            />
                        </Col>
                    </Row>
                </div>
                <div className={styles.descTitle}>
                    <span>
                        商品详情
                    </span>
                    <span>
                        商品图文详细介绍
                    </span>
                </div>
                <Divider/>
                <div className={styles.footer} dangerouslySetInnerHTML={{
                    __html: data?.shopDescription || ''
                }}>
                </div>
            </Card>
            <Footer style={{textAlign: 'center'}}>Copyright &copy;2022 Created by WWDY</Footer>
        </Col>
    );
};


type MiddleProps = {
    title: string,
    icon: ReactNode,
    description: string
}

const Middle = (props: MiddleProps) => {

    const {title,icon,description} = props

    return (
        <div style={{textAlign: "center",padding:30,height:'220px'}}>
            <div
                style={
                    {
                        color: '#6d62e4',
                        fontSize: '2.5rem',
                        margin:' -10px'
                    }
                }
            >
                {icon}
            </div>
            <br/>
            <span
                style={
                    {
                        fontWeight: 500,
                        fontSize: '1.3rem',
                        marginBottom: 10,
                        display:'list-item'
                    }
                }
            >
                {title}
            </span>
            <br/>
            <span
                style={
                    {
                        fontWeight: 400,
                        fontSize: '.9rem',
                        color: '#8b8993',
                        display:'list-item',
                        marginTop: -20
                    }
                }
            >
                {description}
            </span>
        </div>
    )
}

export default ShopDetail;
