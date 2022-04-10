// @flow
import * as React from 'react';
import {Alert, Avatar, Button, Card, Dropdown, Image, Menu, message} from "antd";
import Marquee from 'react-fast-marquee';
import styles from './index.module.less'
import Search from "antd/es/input/Search";
import logo from '../../../public/img/favicon.png'
import {LOGIN_GET_TOKEN, LOGIN_URL, SESSION_STORAGE_CURRENT_ROUTE_KEY, SESSION_STORAGE_TOKEN_KEY} from "../../constant";
import {useEffect} from "react";
import axiosInstance, {ResultVO} from "../../axios/axios";
import {Link, useNavigate} from "react-router-dom";
import {HeartOutlined, ShoppingCartOutlined, LogoutOutlined, AccountBookOutlined} from "@ant-design/icons";

const Header = () => {

    const [username, setUsername] = React.useState('');
    const [notice, setNotice] = React.useState('');

    const navigate = useNavigate();

    const unLogin = <>
        <Button className={styles.button} size={"large"} type={"text"} onClick={() => {
            localStorage.setItem(SESSION_STORAGE_CURRENT_ROUTE_KEY, window.location.pathname)
            window.location.replace(encodeURI(LOGIN_URL + LOGIN_GET_TOKEN))
        }}>登录</Button>
        <Button className={styles.button} size={"large"} type={"text"} onClick={() => {
            localStorage.setItem(SESSION_STORAGE_CURRENT_ROUTE_KEY, window.location.pathname)
            window.location.replace(encodeURI('http://localhost/register'))
        }}>注册</Button>
    </>

    const menu = <Menu style={{borderRadius: 5}}>
        <Menu.Item key={1}>
            <Link target={"_blank"} to={'/cart'}><span><ShoppingCartOutlined/> &nbsp;购物车</span></Link>
        </Menu.Item>
        <Menu.Item key={2}>
            <Link target={'_blank'} to={'/wish-list'}><span><HeartOutlined/> &nbsp;我的收藏</span></Link>
        </Menu.Item>
        <Menu.Item key={0}>
            <Link target={'_blank'} to={'/order'}><span><AccountBookOutlined/> &nbsp;我的订单</span></Link>
        </Menu.Item>
        <Menu.Item key={3} onClick={() => {logout()}}>
            <span><LogoutOutlined/> &nbsp;注销登录</span>
        </Menu.Item>
    </Menu>

    const login = <>
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Avatar style={{verticalAlign: 'middle', backgroundColor: '#7367f0'}} size="large">
                    {username.length >= 3 ? username.substring(0, 1) : username}
                </Avatar>
            </a>
        </Dropdown>
    </>


    const getUserInfo = () => {
        axiosInstance('/front/user/info', {
            method: 'GET',
            params: {
                token: localStorage.getItem(SESSION_STORAGE_TOKEN_KEY)
            }
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setUsername(resVO.data.username);
            }
        }).catch()
    }

    const getNotice = () => {
        axiosInstance('/front/notice/top1', {
            method: 'GET'
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                setNotice(resVO.data.content)
            }else{
                message.error(resVO.message).then()
            }
        }).catch()
    }

    const logout = () => {
        axiosInstance('/auth/login/logout', {
            method: 'GET',
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                localStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
                setUsername('')
                navigate('/')
                message.success(resVO.message).then()
            }else{
                message.error(resVO.message).then()
            }
        }).catch()
    }

    useEffect(() => {
        getNotice()
        if (localStorage.getItem(SESSION_STORAGE_TOKEN_KEY)) {
            getUserInfo();
        }
    }, [])

    return (
        <Card className={styles.header}>
            <div className={styles.logo}>
                <Image src={logo} preview={false} onClick={() => navigate("/")}/>
            </div>
            <Alert
                className={styles.msg}
                banner
                type={'info'}
                showIcon={true}
                icon={'📢'}
                message={
                    <Marquee pauseOnHover gradient={false}>
                        {notice}
                    </Marquee>
                }
            />
            <Search
                className={styles.search}
                size={"large"}
                placeholder={'搜索'}
                onSearch={value => navigate('/search?title=' + value)}
            />
            <div className={styles.buttons}>
                {username.length > 0 ? login : unLogin}
            </div>
        </Card>
    );
};

export default Header