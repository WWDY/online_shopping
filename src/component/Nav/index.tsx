import * as React from 'react';
import styles from './index.module.less'
import {useEffect, useRef, useState} from "react";
import Carousel, {CarouselRef} from "antd/es/carousel";
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import {MouseEvent} from 'react'
import {Link, NavLink, Outlet} from "react-router-dom";
import {Button} from "antd";

const Nav = () => {

    //useEffect(),获取data数据
    const data = [
        "手机",
        "电视",
        "平板",
        "手机",
        "电视",
        "平板",
        "手机",
        "电视",
        "平板",
        "手机"]

    const [display, setDisplay] = useState(false);

    const carousel = useRef<CarouselRef>(null);

    const prev = () => {
        carousel.current?.prev();
    }

    const next = () => {
        carousel.current?.next();
    }

    const firstMenu = (event: MouseEvent<HTMLElement>) => {
        let menuName = event.currentTarget.innerText;
        setDisplay(true);
    }

    return (
        <div className={styles.nav}>
            <div className={styles.left}>
                <ul className={styles.list}>
                    {
                        data.map((context, index) => {
                            return (
                                <li onMouseEnter={(event) => firstMenu(event)}
                                    onMouseOut={() => setDisplay(false)}
                                    key={index}>
                                    {context}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {!display ? '' : (
                <div className={styles.secondSelect}
                     onMouseEnter={() => {
                         setDisplay(true)
                     }}
                     onMouseLeave={() => {
                         setDisplay(false)
                     }}>
                    <ul className={styles.secondContent}>
                        <li>buzhidao</li>
                    </ul>
                </div>
            )}
            <div>
                <Carousel autoplay={true} ref={carousel} effect={"fade"}>
                    <img className={styles.navImg} src="/src/static/images/2.jpg" alt=""/>
                    <img className={styles.navImg}
                         src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/2a8c552d4d6a06809892d007faeddedf.jpg?w=2452&h=920"
                         alt=""/>
                    <img className={styles.navImg} src="/src/static/images/3.jpg" alt=""/>
                </Carousel>
            </div>
            <div id={"lt"} className={styles.lt} onClick={prev}>
                <LeftOutlined/>
            </div>
            <div id={"gt"} className={styles.gt} onClick={next}>
                <RightOutlined/>
            </div>
            <Link to={"/404"}>
                <Button type={"primary"}>404</Button>
            </Link>
            <Link to={"/login"}>
                <Button type={"primary"}>login</Button>
            </Link>
            <Outlet/>
        </div>
    );
};
export default Nav