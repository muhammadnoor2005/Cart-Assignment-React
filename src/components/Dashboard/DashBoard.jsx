import { Button, Input} from "antd"
import { Link } from "react-router-dom";
import "./DashBoard.scss";
import { useEffect, useState } from "react";
import CreateEditItem from "../CreateEditItem/CreateEditItem";

export default function DashBoard(){
    const [creatItemBool,setBool] = useState(false);
    const [products,setProducts] = useState([]);

    const date = new Date();
    const milliSec = date.getTime();

    useEffect(()=>{
        const getItems = localStorage.getItem("items");
        if(getItems){
            setProducts(JSON.parse(getItems));
        }
    },[creatItemBool]);
    
    const uploadItem = (event,titleVal,descVal,priceVal,base64Img) => {
        event.preventDefault();
        setBool(false);

        const productInfo = {titleVal,descVal,priceVal,count:0,id:milliSec,productImg:base64Img};
        const updatedItems = [...products,productInfo];
        
        localStorage.setItem("items",JSON.stringify(updatedItems));
        alert("Item created");
    }
    
    return(
        <div>
            <div className="dashboardButtons">
                <Button type="primary" className="createItem" onClick={()=>{setBool(true)}}>Create item</Button>
                <Button type="primary" className="viewItems" >
                    <Link to={"/view created items"}>View created items</Link>
                </Button>
                <Button type="primary" className="browseItem">
                    <Link to={"/browse items"}>Browse Items</Link>
                </Button>
            </div>
            <CreateEditItem setBool={setBool} uploadItem={uploadItem} creatItemBool={creatItemBool} />
        </div>
    )
}