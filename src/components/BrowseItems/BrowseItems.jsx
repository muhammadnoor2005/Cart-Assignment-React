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
        
        const parsedItems = gettingParsedItems();
        if(parsedItems){
            let itemCount = 0;

            gettingParsedItems().forEach((item) => {
                itemCount += item.count;
            });
            
            setItems(parsedItems);
            setCount(itemCount);
        }
       

    },[]);

    if (items.length === 0){
        return(
            <div className="emptyItemsDiv">
                No items to show
            </div>
        )
    }
    const itemsList = items.map((item) => {
        const base64Data = item.productImg.split(",")[1];
        const decodeImg = `data:image/jpg;base64,${base64Data}`;
        return(
                <Link key={item.id} to={`/browse items/${item.id}`} className='productsCard'>
                    <Card 
                    hoverable
                    cover={<img src={decodeImg} width={170} height={180} alt={"product"}/>}
                    >
                    <Meta title={item.titleVal} description={`$${item.priceVal}`} />
                    </Card>
                </Link>
        )
    })
    return(
        <div>
            <Link to={"/cart"}><img src={"/images/cartIcon.png"} alt="cart" className="cartImg"/></Link>
            <span className="cartItemCount">{cartItemCount}</span>
            
            <div className="products">
                {itemsList}
            </div>
        </div>
    )
}