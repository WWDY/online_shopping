import React, {useEffect, useState} from 'react';
import {Card, Divider, Tag} from "antd";
import {DateUtil} from "../../util/DateUtil";

type MyOderProps = {
    data:{
        orderId: string
        payStatus: boolean
        createdTime: number
        snapshots: Array<any>
    }
}

const MyOrder = (props: MyOderProps) => {

    const {data} = props;

    const [total,setTotal] = useState<string>('0')

    useEffect(() => {
        let num = 0
        data.snapshots.forEach(item => {
            num += item.shopDiscountPrice
        })
        const s = num.toFixed(2);
        setTotal(s)
    },[])

    const title = <>
        <span style={{marginRight:30}}>订单号：{data.orderId}</span>
        {
            data.payStatus ? <Tag color="green">已支付</Tag> : <Tag color="red">未支付</Tag>
        }
        <span style={{float:'right'}}>付款时间： {DateUtil.formatDate(data.createdTime * 1000,'yyyy-MM-dd HH:mm:ss')}</span>
    </>

    return (
        <Card
            title={title}
            style={{margin:20,borderRadius:10}}
        >
            {
                data.snapshots.map((item, index) => {
                    return <OrderSnapshot key={index} data={item}/>
                })
            }
            <h2>总价：{total}</h2>
        </Card>
    );
};


type OrderSnapshotProps = {
    data: {
        shopTitle: string
        shopPrice: number
        shopDiscountPrice: number
        shopCount: number
    }
}
const OrderSnapshot = (props: OrderSnapshotProps) => {
    const {data} = props;
    return(
        <div>
            <span style={{marginRight:30}}>商品名称：<span style={{fontWeight:600}}>{data.shopTitle}</span></span>
            <span style={{marginRight:30}}>原价：<span style={{fontWeight:600}}>{data.shopPrice}</span></span>
            <span style={{marginRight:30}}>折扣价：<span style={{fontWeight:600}}>{data.shopDiscountPrice}</span></span>
            <span style={{marginRight:30}}>数量：<span style={{fontWeight:600}}>{data.shopCount}</span></span>
            <Divider/>
        </div>
    )
}

export default MyOrder;