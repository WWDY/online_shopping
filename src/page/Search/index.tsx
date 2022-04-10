import React, {useEffect, useState} from 'react';
import Header from "../../component/Header";
import {Footer} from "antd/es/layout/layout";
import Filters from "../../component/Filters";
import {Col, Input, Pagination, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import styles from './index.module.less'
import axiosInstance, {PageVO, ResultVO} from "../../axios/axios";
import ShopList from "../../component/ShopList";
import {useSearchParams} from "react-router-dom";

const filter = {
    title: null,
    minPrice: null,
    maxPrice: null,
    category: null,
}

const Search = () => {


    /**
     * state
     */
    const [data, setData] = React.useState<any[]>([]);
    const [pageInfo, setPageInfo] = useState<any>({page: 1, size: 9, total: 0});

    const [searchParams] = useSearchParams();



    /**
     * function
     */
    const getMaxPrice = (price: number) => {
        (filter.maxPrice as any) = price
    }

    const getMinPrice = (price: number) => {
        (filter.minPrice as any) = price
    }

    const getCategory = (category: number) => {
        (filter.category as any) = category
    }

    const getSearchData = (page: number = 1, pageSize: number = 9) => {
        axiosInstance('/front/shop/search',{
            method: 'GET',
            params: {...filter,page: page, size: pageSize}
        }).then(res => {
            const resVO = res.data as ResultVO;
            if (resVO.code === 0) {
                const pageVO = resVO.data as PageVO;
                setData(pageVO.content)
                setPageInfo({page: pageVO.page, size: pageVO.size, total: pageVO.total})
            }
        })
    }

    /**
     * hook
     */
    useEffect(() => {
        if(searchParams.get('title')){
            (filter.title as any) = searchParams.get('title')
            getSearchData()
        }
    },[])

    return (
        <div>
            <Header/>
            <Row style={{minHeight:'calc(100vh - 170px)'}}>
                <Col span={4}>
                    <Filters getCategory={getCategory} getMaxPrice={getMaxPrice} getMinPrice={getMinPrice}/>
                </Col>
                <Col span={20} >
                    <div>
                        <Input
                            style={{padding:'0 20px'}}
                            onChange={(e) => {
                                (filter.title as any) = e.target.value
                            }}
                            defaultValue={searchParams.get('title') || ''}
                            size={"large"}
                            addonAfter={<SearchOutlined onClick={() => {getSearchData()}}/>}
                            placeholder={"商品名称"}
                        />
                        {
                            data.map((item, index) => {
                                return <ShopList data={item} key={index}/>
                            })
                        }
                    </div>
                    <Pagination
                        hideOnSinglePage={true}
                        style={{textAlign:'right',margin:20}}
                        pageSize={pageInfo.size}
                        current={pageInfo.page}
                        total={pageInfo.total}
                        onChange={(page, pageSize) => {
                            getSearchData(page,pageSize)
                        }}
                    />
                </Col>
            </Row>
            <Footer style={{textAlign: 'center'}}>Copyright &copy;2022 Created by WWDY</Footer>
        </div>
    );
};

export default Search;