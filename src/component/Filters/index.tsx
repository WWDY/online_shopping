import React, {useEffect} from 'react';
import {Card, InputNumber, message, Radio, Space} from "antd";
import styles from './index.module.less';
import axiosInstance, {ResultVO} from "../../axios/axios";

type Props = {
    getMinPrice: (price: number) => void,
    getMaxPrice: (price: number) => void,
    getCategory: (category: number) => void,
}

const Filters = (props: Props) => {

    /**
     * state
     */
    const [category, setCategory] = React.useState<any[]>([]);

    const [minPrice, setMinPrice] = React.useState<number | null>(null);


    /**
     * function
     */

    const {getMinPrice, getMaxPrice, getCategory} = props;

    const getCategories = () => {
        axiosInstance('/front/category/root',{
            method: 'GET'
        }).then(res => {
            const resVO = res.data as ResultVO;
            if(resVO.code === 0){
                setCategory(resVO.data);
            }else{
                message.error(resVO.message).then();
            }
        })
    }

    /**
     * hook
     */
    useEffect(() => {
        getCategories();
    }, []);


    return (
        <Card style={
            {
                borderRadius: '10px',
                maxWidth: '260px',
                margin:'0 20px',
                borderColor: 'transparent',
                boxShadow: '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)'
            }
        }
        >
            <FilterList title={'价格范围'} content={
                <>
                    <InputNumber placeholder={'起始值'} min={0} onChange={(value: number) => {setMinPrice(value);getMinPrice(value)}}/>
                    <span style={{fontSize:'1.5rem'}}>~</span>
                    <InputNumber placeholder={'结束值'} min={minPrice || 0} onChange={(value: number) => {getMaxPrice(value)}}/>
                </>
            }/>
            <FilterList title={'分类'} content={
                <Radio.Group onChange={(e) => getCategory(e.target.value)}>
                    <Space direction={"vertical"}>
                        {
                            category.map(item => {
                                return (
                                    <Radio style={{color:'#6e6b7b'}} key={item.key} value={item.value}>{item.title}</Radio>
                                )
                            })
                        }
                    </Space>
                </Radio.Group>
            }/>
        </Card>
    );
};

type FilterListProps = {
    title: string,
    content: React.ReactNode,
}

const FilterList = (props: FilterListProps) => {
    return (
        <div style={{margin:'0 0 40px 0'}}>
            <div className={styles.title}>
                {props.title}
            </div>
            <div className={styles.list}>
                {props.content}
            </div>
        </div>
    );
}

export default Filters;