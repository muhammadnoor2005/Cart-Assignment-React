import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { addItem } from "../../services/cart";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductDetail(){
    const items = JSON.parse(localStorage.getItem("items"));
    const [cartItemCount,setCount] = useState(0);
    const [updateCondition,setUpdate] = useState(0);

    const {id} = useParams();

    const product = items.find(p => p.id === +id);

    let decodedImg ;
    const base64Data = product.productImg.split(",")[1];
    const decodeImg = `data:image/jpg;base64,${base64Data}`;
    decodedImg = decodeImg;

    useEffect(()=>{
        let itemCount = 0;

        items.forEach((item) => {
            itemCount += item.count;
        })
        setCount(itemCount);

    },[updateCondition]);

    const increaseCount = () => {
        setUpdate(prevState => prevState + 1);
    }

    return(
        <div className="productDetailMainDiv">
            <Link to={"/cart"}><img src="/images/cartIcon.png" alt="cart" className="cartImg"/></Link>
            <span className="cartItemCount">{cartItemCount}</span>

            <div className="productName">{product.titleVal}</div>

            <div className="productImgDiv">
                <img className="productImg" src={decodedImg} alt="prodcuct"/>
            </div>
            
            <div>
                <span className="descHeading">Description</span>  
                <br/><br/>
                <span className="priceSpan">${product.priceVal}</span>
                <br/><br/>
                <span className="descVal">{product.descVal}</span>
                <br/><br/>
                <Button type="primary" onClick={() => {addItem(product.id);increaseCount()}}>Add to cart</Button>
            </div>
        </div>
    )
}