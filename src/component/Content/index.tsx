import React, {useEffect} from 'react';
import styles from './index.module.less'
import ShopCard from "../ShopList";
import {Link} from "react-router-dom";
import axiosInstance, {ResultVO} from "../../axios/axios";
import {message} from "antd";

const data = [
    {
        id: 20,
        cartStatus: true,
        wishListStatus: false,
        title:'Apple Watch Series 5',
        price:111,
        discountPrice:9.99,
        description:'On Retina display that never sleeps, so it’s easy to see the time and other important information, without raising or tapping the display. ',
        sliderShow:['https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/1.0c19af20.png']
    },
    {
        id: 21,
        cartStatus: false,
        wishListStatus: false,
        title:'Apple iPhone 11 (64GB, Black)',
        price:111,
        discountPrice:9.99,
        description:'The Apple iPhone 11 is a great smartphone, which was loaded with a lot of quality features.',
        sliderShow:['https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/2.64ec9144.png']
    },
    {
        id: 22,
        cartStatus: false,
        wishListStatus: false,
        title:'Apple iMac 27-inch',
        price:111,
        discountPrice:9.99,
        description:'The all-in-one for all. If you can dream it, you can do it on iMac. ',
        sliderShow:['https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/3.b3c8f04e.png']
    },
    {
        id: 23,
        cartStatus: false,
        wishListStatus: false,
        title:'OneOdio A71 Wired Headphones',
        price:111,
        discountPrice:9.99,
        description:'Omnidirectional detachable boom mic upgrades the headphones into a professional headset for gaming, business, podcasting and taking calls on the go.',
        sliderShow:['https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/4.9573c075.png']
    },
    {
        id: 24,
        cartStatus: false,
        wishListStatus: false,
        title:'Apple - MacBook Air® (Latest Model) - 13.3" Display - Silver',
        price:111,
        discountPrice:9.99,
        description:'MacBook Air is a thin, lightweight laptop from Apple. MacBook Air features up to 8GB of memory, ',
        sliderShow:['https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/5.280939a5.png']
    },
    {
        id: 25,
        cartStatus: false,
        wishListStatus: false,
        title:'Switch Pro Controller',
        price:111,
        discountPrice:9.99,
        description:'The Nintendo Switch Pro Controller is one of the priciest "baseline" controllers in the current console generation,',
        sliderShow:['https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/6.72ede113.png']
    },{
        id: 26,
        cartStatus: false,
        wishListStatus: false,
        title:'Google - Google Home - White/Slate fabric',
        price:111,
        discountPrice:9.99,
        description:'Simplify your everyday life with the Google Home, a voice-activated speaker powered by th',
        sliderShow:['https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/7.0a9d1776.png']
    },
    {
        id: 27,
        cartStatus: false,
        wishListStatus: false,
        title:'OnePlus 7 Pro',
        price:1111,
        discountPrice:99.99,
        description:'The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels very premium but’s it’s also very heavy. The Nebula Blue variant looks slick but it’s quite slippery, which makes single-handed use a real challenge. It has a massive 6.67-inch ‘Fluid AMOLED’ display',
        sliderShow:['https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/9.89feb552.png']
    }


]

const Content = () => {

    /**
     * state
     */
    const [shopList,setShopList] = React.useState<any[]>([])

    /**
     * hook
     */
    useEffect(() => {
        getShopList()
    },[])

    /**
     * function
     */
    const getShopList = () => {
        axiosInstance('/front/shop/',{
            method:'GET',
            params:{
                page:1,
                size:10
            }
        }).then(res => {
            const resVO = res.data as ResultVO;
            if(resVO.code === 0){
                setShopList([...resVO.data.content,...data])
            }else{
                message.error(resVO.message).then()
            }
        }).catch()
    }

    return (
        <div className={styles.content}>
            {
                shopList.map((item,index) => {
                    return <ShopCard key={index} data={item}/>
                })
            }
        </div>
    );
};

export default Content;