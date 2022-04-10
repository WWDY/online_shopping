import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Image, message, Row} from "antd";
import styles from './index.module.less';
import {HeartOutlined, CloseOutlined} from "@ant-design/icons";
import axiosInstance, {ResultVO} from "../../axios/axios";
import {Link} from "react-router-dom";

type Props = {
    data: {
        id: number
        sliderShow: string[]
        title: string
        stock: number
        price: number
        discountPrice: number
        wishListStatus: boolean
    }
    removeItem: (id: number) => void
    getValue: (value: number) => void
}

const ShoppingCart = (props: Props) => {

    const [propsData, setPropsData] = useState<typeof props.data>(props.data)
    const [value, setValue] = useState<number>(1)

    const date = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return year + '-' + month + '-' + day;
    };

    const wishList = () => {
        axiosInstance('/front/wishlist/', {
            method: 'POST',
            data: JSON.stringify({shopId: props.data.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setPropsData({...propsData, wishListStatus: true})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    const removeWishList = () => {
        axiosInstance('/front/wishlist/', {
            method: 'DELETE',
            data: JSON.stringify({shopId: props.data.id})
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setPropsData({...propsData, wishListStatus: false})
                message.success(resVO.message).then();
            } else {
                message.error(resVO.message).then();
            }
        })
    }

    return (
        <Card hoverable={true} className={styles.cart}>
            <Row style={{height: '100%'}}>
                <Col span={18} className={styles.left}>
                    <div>
                        <Link target={"_blank"} to={'/detail/' + props.data.id}>
                            <div className={styles.img}>
                                <Image
                                    src={props.data.sliderShow[0]}
                                    preview={false}/>
                            </div>
                        </Link>
                        <div className={styles.content}>
                            <Link target={"_blank"} to={'/detail/' + props.data.id}>
                                <div className={styles.title}>{props.data.title}</div>
                            </Link>
                            <div className={styles.stock}>{props.data.stock > 0 ? '有货' : '缺货'}</div>

                            <Qty getValue={(v) => props.getValue(v)} max={props.data.stock} style={{margin: '35px 0'}}
                                 label={'数量'}/>

                            <div className={styles.date}>购买日期: {date()}</div>
                            <div
                                className={styles.discount}>{((props.data.price - props.data.discountPrice) / props.data.price * 100).toFixed(2)}%
                                折扣
                            </div>

                        </div>
                    </div>
                </Col>
                <Col span={6} className={styles.right}>
                    <div style={{height: '150px'}}>
                        <span className={styles.price}>￥{props.data.discountPrice}</span>
                        <Button
                            icon={<CloseOutlined/>}
                            size={"large"}
                            style={
                                {
                                    backgroundColor: '#f7f7f7',
                                    color: '#6e6b7b',
                                    width: "80%",
                                    margin: '15px 0',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                }
                            }
                            onClick={() => {
                                props.removeItem(props.data.id)
                            }}
                        >
                            移除商品
                        </Button>
                        <br/>
                        <Button
                            icon={<HeartOutlined style={propsData.wishListStatus ? {color: '#ea5455'} : {}}/>}
                            size={"large"}
                            style={
                                {
                                    backgroundColor: '#6d62e4',
                                    color: '#FFF',
                                    width: "80%",
                                    fontSize: '1rem',
                                    borderRadius: '6px',
                                }
                            }
                            onClick={propsData.wishListStatus ? removeWishList : wishList}
                        >
                            {propsData.wishListStatus ? '已 收 藏' : '收 　　藏'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

type QtyProps = {
    min?: number,
    max?: number,
    defaultValue?: number,
    label: string,
    style?: React.CSSProperties,
    getValue: (value: number) => void,
}

const Qty = (props: QtyProps) => {

    const [currentNumber, setCurrentNumber] = useState(props.defaultValue || 1);
    const [decBackgroundColor, setDecBackgroundColor] = useState('#6d62e4');
    const [addBackgroundColor, setAddBackgroundColor] = useState('#6d62e4');

    const add = () => {
        if (currentNumber < (props.max || Number.MAX_VALUE)) {
            setCurrentNumber(number => number + 1);
        }
    };

    const decrement = () => {
        if (currentNumber > (props.min || 1)) {
            setCurrentNumber(number => number - 1);
        }
    };


    useEffect(() => {
        props.getValue(currentNumber);
        if (currentNumber === (props.min || 1)) {
            setDecBackgroundColor('rgba(34,41,47,.5)')
        } else if (currentNumber === (props.max || Number.MAX_VALUE)) {
            setAddBackgroundColor('rgba(34,41,47,.5)')
        } else {
            setDecBackgroundColor('#6d62e4')
            setAddBackgroundColor('#6d62e4')
        }
    }, [currentNumber]);


    return (
        <div style={{userSelect: 'none', ...props.style}}>
            <div style={
                {
                    display: "inline-block",
                    marginRight: '10px',
                    color: '#5e5873'
                }
            }>
                {props.label}
            </div>
            <div
                style={
                    {
                        marginTop: '5px',
                        padding: 0,
                        fontSize: '1.5rem',
                        width: '20px',
                        height: '20px',
                        backgroundColor: decBackgroundColor,
                        borderRadius: '5px',
                        color: '#FFF',
                        textAlign: 'center',
                        display: "inline-block",
                        lineHeight: '13px',
                        marginRight: '-15px',
                        zIndex: 1,
                        position: 'relative',
                    }
                } onClick={decrement}>-
            </div>
            <div style={
                {
                    width: '57px',
                    border: 'none',
                    backgroundColor: '#f7f7f7',
                    height: '30px',
                    lineHeight: '30px',
                    fontSize: '1rem',
                    textAlign: 'center',
                    borderRadius: '5px',
                    display: "inline-block",
                    zIndex: -1
                }
            }>
                {currentNumber}
            </div>
            <div
                style={
                    {
                        fontSize: '1.5rem',
                        width: '20px',
                        height: '20px',
                        backgroundColor: addBackgroundColor,
                        borderRadius: '5px',
                        color: '#FFF',
                        textAlign: 'center',
                        lineHeight: '15px',
                        display: "inline-block",
                        marginLeft: '-5px'
                    }
                }
                onClick={add}
            >+
            </div>
        </div>

    )
}

export default ShoppingCart;