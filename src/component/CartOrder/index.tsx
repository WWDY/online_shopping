import React, {useEffect} from 'react';
import {Button, Card, Divider} from "antd";


type Props = {
    data: {
        price: number
        discountPrice: number
    },
    address: () => void
}

const CartDetail = (props: Props) => {

    const [data, setData] = React.useState(props.data);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <Card style={{borderRadius: 10}} title={'账单'}>
            <div style={{fontWeight:'600',color:'#5e5873'}}>价格明细</div>
            <div style={{margin:'10px 0'}}>
                <span style={{color:'#6e6b7b',float:'left'}}>总价</span>
                <span style={{color:'#6e6b7b',float:'right'}}>￥{data.price}</span>
            </div>
            <br/>
            <div style={{margin:'10px 0'}}>
                <span style={{color:'#6e6b7b',float:'left'}}>折扣</span>
                <span style={{color:'#55d38d',float:'right'}}>-{(data.price - data.discountPrice).toFixed(2)}￥</span>
            </div>
            <br/>
            <div style={{margin:'10px 0'}}>
                <span style={{color:'#6e6b7b',float:'left'}}>邮费</span>
                <span style={{color:'#55d38d',float:'right'}}>包邮</span>
            </div>
            <br/>
            <Divider/>
            <div style={{fontWeight:'600',color:'#5e5873'}}>
                <span style={{color:'#5e5873',float:'left'}}>折后总价</span>
                <span style={{color:'#5e5873',float:'right'}}>￥{data.discountPrice}</span>
            </div>
            <br/>
            <br/>
            <div>
                <Button disabled={data.price == 0} onClick={props.address} size={"large"} style={{borderRadius:6,width:'100%'}} type={"primary"}>下单</Button>
            </div>
        </Card>
    );
};

export default CartDetail