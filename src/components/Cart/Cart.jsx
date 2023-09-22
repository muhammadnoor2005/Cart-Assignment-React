import "./Cart.scss";
import { useEffect, useState } from "react"
import { addItem, cartItemsTotal, decreaseItem, gettingParsedItems,removeCartItem } from "../../services/cart";

export default function Cart(){
    const [items,setItems] = useState([]);
    const [changes,setChanges] = useState(0);
    const [cartItemCount,setCount] = useState(0);
    const itemsPriceTotal = cartItemsTotal();

    useEffect(() => {
        setItems(gettingParsedItems);

        let itemCount = 0;

        gettingParsedItems().forEach((item) => {
            itemCount += item.count;
        });
        setCount(itemCount);
     
    },[changes]);

    const update = () => {
        setChanges(prevState => prevState + 1)
    }

    if(cartItemCount === 0){
        return(
        <div className="emptyCartDiv">
            Cart is empty
        </div>
        )
    }
    const cartItemsList = items.map((product) => {
        if(product.count === 0){
            return <div></div>
            
        }
        return(
            <div className="cartItemMainDiv" key={product.id}>
                <img src="/images/productImg.jpg" alt="product" className="cartItemImg"/>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    width:"480px"
                }}>
                    <div className="productNameDiv">
                        <span className="productTitle">{product.titleVal}</span>
                        <br/>
                        <span className="removeButton" onClick={()=>{removeCartItem(product.id);update()}}>Remove</span>
                    </div>

                    <div className="productPriceAndCount">
                        <span>${product.priceVal}</span>

                        <div className="productCount">
                            <span style={{cursor:"pointer"}} onClick={()=>{decreaseItem(product.id);update()}}>-</span>
                            <span>{product.count}</span>
                            <span style={{cursor:"pointer"}} onClick={() => {addItem(product.id);update()}}>+</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return(
        <div style={{margin:"3%", display:"flex",justifyContent:"space-between"}}>
            
            <div>{cartItemsList}</div>

            <div>
                <span>Total Amount ${itemsPriceTotal}</span>
                <br/>
                <span>{cartItemCount} item(s) in cart</span>
            </div>
        </div>
    )
}