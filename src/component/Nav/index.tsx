// @flow
import * as React from 'react';
import styles from './index.module.less'
import { useRef } from "react";
import Carousel, {CarouselRef} from "antd/es/carousel";

type Props = {

};


const Nav = (props: Props) => {

    const carousel = useRef<CarouselRef>(null);

    const prev = () => {
        carousel.current?.prev();
    }

    const next = () => {
        carousel.current?.next();
    }

    // @ts-ignore
    return (
        <div className={styles.nav}>
            <div className={styles.left}>
                <ul className={styles.list}>
                    <li>手机</li>
                    <li>电视</li>
                    <li>平板</li>
                    <li>手机</li>
                    <li>电视</li>
                    <li>平板</li>
                    <li>手机</li>
                    <li>电视</li>
                    <li>平板</li>
                    <li>手机</li>
                </ul>
            </div>
            <div>
                <Carousel autoplay={true} ref={carousel} effect={"fade"}>
                    <img className={styles.navImg} src="/src/static/images/2.jpg" alt=""/>
                    <img className={styles.navImg} src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/2a8c552d4d6a06809892d007faeddedf.jpg?w=2452&h=920" alt=""/>
                    <img className={styles.navImg} src="/src/static/images/3.jpg" alt=""/>
                </Carousel>
            </div>
            <div id={"lt"} className={styles.lt} onClick={prev}/>
            <div id={"gt"} className={styles.gt} onClick={next}/>
        </div>
    );
};
export default Nav