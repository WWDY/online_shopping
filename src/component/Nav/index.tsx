import * as React from 'react';
import styles from './index.module.less'
import {useEffect, useRef, useState} from "react";
import Carousel, {CarouselRef} from "antd/es/carousel";
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import {MouseEvent} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {message} from "antd";
import axiosInstance, {ResultVO} from "../../axios/axios";

type Category = {
    key: number
    title: string
    value: number
    children: Category[]
}

const Nav = () => {

    //useEffect(),获取data数据
    const [categories, setCategories] = useState<Category[]>([])
    const [secondCategories, setSecondCategories] = useState<Category[] | null>(null)

    const [display, setDisplay] = useState(false);
    const [images, setImages] = useState([]);

    const carousel = useRef<CarouselRef>(null);


    useEffect(() => {
        getImages()
        getCategories()
    }, [])

    const getImages = () => {
        axiosInstance('/front/slider-show/top3', {
            method: 'GET',
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setImages(resVO.data);
            } else {
                message.error(resVO.message).then()
            }
        }).catch()
    }

    const getCategories = () => {
        axiosInstance('/front/category/tree', {
            method: 'GET'
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setCategories(resVO.data)
            } else {
                message.error(resVO.message).then()
            }
        }).catch()
    }

    const prev = () => {
        carousel.current?.prev();
    }

    const next = () => {
        carousel.current?.next();
    }

    const firstMenu = (event: MouseEvent<HTMLElement>) => {
        let menuName = event.currentTarget.innerText;
        setSecondCategories(categories.filter(category => category.title === menuName)[0].children)

        console.log(menuName)
        setDisplay(true);
    }

        return (
            <div className={styles.nav}>
                <div className={styles.left}>
                    <ul className={styles.list}>
                        {
                            categories.map((item, index) => {
                                return (
                                    <li onMouseEnter={(event) => firstMenu(event)}
                                        onMouseOut={() => setDisplay(false)}
                                        key={index}>
                                        {item.title}
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
                        {
                        secondCategories && secondCategories.map((category,index) => {
                          return <ul key={index} className={styles.secondContent}>
                                <div>
                                    <Link target={'_blank'} to={'/search?title='+ category.title}>
                                        <div className={styles.title}>{category.title}</div>
                                    </Link>
                                    {
                                        category.children.map((item,index1) => {
                                           return <Link key={index + '-' + index1} target={'_blank'} to={'/search?title=' + item.title}>
                                                     <span>{item.title}</span>
                                                  </Link>
                                        })
                                    }
                                </div>
                            </ul>
                        })
                    }
                    </div>
                )}
                <div>
                    <Carousel autoplay={true} ref={carousel} effect={"fade"}>
                        {
                            images.map((context, index) => {
                                return (
                                    <Link key={index} to={(context as any).route!} target={'_blank'}>
                                        <img className={styles.navImg} src={(context as any).url} alt=""/>
                                    </Link>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div id={"lt"} className={styles.lt} onClick={prev}>
                    <LeftOutlined/>
                </div>
                <div id={"gt"} className={styles.gt} onClick={next}>
                    <RightOutlined/>
                </div>
            </div>
        );

};
export default Nav