import "./BrowseItems.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from 'antd';
import { gettingParsedItems } from "../../services/cart";
const { Meta } = Card;

export default function BrowseItems(){
    const [items,setItems] = useState([]);
    const [cartItemCount,setCount] = useState(0);

    useEffect(()=>{
        setItems(gettingParsedItems);
        
        let itemCount = 0;

        gettingParsedItems().forEach((item) => {
            itemCount += item.count;
        });

        setCount(itemCount);

    },[]);

    if (items.length === 0){
        return(
            <div className="emptyItemsDiv">
                No items to show
            </div>
        )
    }
    const itemsList = items.map((item) => {
        return(
            <>
                <Link to={"/cart"}><img src="/images/cartIcon.png" alt="cart" className="cartImg"/></Link>
                <span className="cartItemCount">{cartItemCount}</span>

                <Link key={item.id} to={`/browse items/${item.id}`} className='productsCard'>
                    <Card 
                    hoverable
                    cover={<img src={"/images/productImg.jpg"} width={170} height={180} alt={"product"}/>}
                    >
                    <Meta title={item.titleVal} description={`$${item.priceVal}`} />
                    </Card>
                </Link>
            </>
        )
    })
    return(
        <div className="products">
            {itemsList}
        </div>
    )
}