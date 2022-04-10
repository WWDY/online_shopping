import React, {useState} from 'react';
import {Button, Card, message} from "antd";
import Meta from "antd/es/card/Meta";
import styles from './index.module.less'
import {HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import {Link, NavLink} from "react-router-dom";
import axiosInstance, {ResultVO} from "../../axios/axios";

type Props = {
    data: {
        id: number,
        title: string,
        price: number,
        discountPrice: number,
        sliderShow: string[],
        description: string,
        cartStatus: boolean
        wishListStatus: boolean
    }
}

const ShopCard = (props: Props) => {

    const {data} = props;

    const [propsData,setPropsData] = useState<typeof data>(data)

    const wishList = () => {
        axiosInstance('/front/wishlist/',{
            method: 'POST',
            data: JSON.stringify({shopId: data.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setPropsData({...propsData,wishListStatus: true})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    const removeWishList = () => {
        axiosInstance('/front/wishlist/',{
            method: 'DELETE',
            data: JSON.stringify({shopId: data.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setPropsData({...propsData,wishListStatus: false})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    const addCart = () => {
        axiosInstance('/front/cart/',{
            method: 'POST',
            data: JSON.stringify({shopId: data.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setPropsData({...propsData,cartStatus: true})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    const removeCart = () => {
        axiosInstance('/front/cart/',{
            method: 'DELETE',
            data: JSON.stringify({shopId: data.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setPropsData({...propsData,cartStatus: false})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    return (
        <Card
            hoverable
            className={styles.card}
            cover={
            <Link target={"_blank"} to={'/detail/'+props.data.id}>
                <img style={{maxWidth:'100%',height:'auto'}} alt={'coverImage'} src={props.data.sliderShow[0]}/>
            </Link>
            }
            actions={
            [
                    <div className={styles.footer}>
                        <Button
                            icon={<HeartOutlined style={ propsData?.wishListStatus ? {color:'#ea5455'} : {}}/>}
                            size={"large"}
                            style={
                                {
                                    border:'none',
                                    backgroundColor:'#f7f7f7',
                                    color:'#6e6b7b',
                                    width:129,
                                    fontWeight:700,
                                    borderRadius:'0 0 0 6px'
                                }
                            }
                            onClick={ propsData.wishListStatus ? removeWishList : wishList }
                        >
                            { propsData.wishListStatus ? '已收藏' : '收藏' }
                        </Button>
                        <Button

                            icon={<ShoppingCartOutlined />}
                            size={"large"}
                            style={
                                {
                                    border:'none',
                                    backgroundColor:'#6d62e4',
                                    color:'#FFF',
                                    width:157,
                                    fontWeight:700,
                                    borderRadius:'0 0 6px 0'
                                }
                            }
                            onClick={propsData?.cartStatus ? removeCart : addCart}
                        >
                            {propsData?.cartStatus ? '已加入购物车' : '加入购物车'}
                        </Button>
                    </div>
            ]
            }
        >
            <Link target={"_blank"} to={'/detail/'+props.data.id}>
                <div className={styles.price}>
                    <span>￥{props.data.price}</span>
                    <span>￥{props.data.discountPrice}</span>
                </div>
                <Meta
                    title={props.data.title}
                    style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}
                    description={props.data.description}
                />
            </Link>
        </Card>
    );
};

export default ShopCard;