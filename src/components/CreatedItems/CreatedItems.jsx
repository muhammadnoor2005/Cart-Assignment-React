import "../BrowseItems/BrowseItems.scss"
import "./CreatedItems.scss"
import { useEffect, useState } from "react";
import { deleteItem, editItem } from "../../services/cart";
import {MdDelete} from "react-icons/md";
import {AiTwotoneEdit} from "react-icons/ai"
import { Button, Card } from 'antd';
import CreateEditItem from "../CreateEditItem/CreateEditItem";
const { Meta } = Card;

export default function CreatedItems(){
    const [items,setItems] = useState([]);
    const [creatItemBool,setBool] = useState(false);
    const [id,setId] = useState();
    const [deleteItemBool,delItem] = useState(false);

    useEffect(()=>{
        const getItems = localStorage.getItem("items");
        const parsedItems = JSON.parse(getItems);

        if (getItems){
            setItems(parsedItems);
        }
    },[creatItemBool,deleteItemBool]);

    const uploadItem = (event,titleVal,descVal,priceVal) => {
        event.preventDefault();
        setBool(false);
        editItem(titleVal,descVal,priceVal,id);
    }

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
                <Card 
                hoverable
                cover={<img src={"/images/productImg.jpg"} width={170} height={180} alt={"product"}/>}
                className='productsCard'
                key={item.id}
                >
                <div style={{display:"flex"}}>
                    <Meta title={item.titleVal} description={`$${item.priceVal}`} />
                    <div style={{display:"flex",alignItems:"flex-end"}}>
                        <MdDelete onClick={() => {setId(item.id);delItem(true)}}/>
                        <AiTwotoneEdit onClick={() => {setBool(true);setId(item.id)}}/>
                    </div>
                </div>
                </Card>
            </>
        )
    })
    return(
        <>
            <div className="products">
                {itemsList}
            </div>

            <CreateEditItem setBool={setBool} uploadItem={uploadItem} creatItemBool={creatItemBool} />
            
            <div className={deleteItemBool?"delItemConfirm":"delItemConfirmHide"}>
                <div className="deleteDialogBox">
                    <span>Are you sure you want to delete?</span>
                    <br/><br/>
                    <div className="deleteDailogBoxButtons">
                        <Button type="primary" onClick={()=>{delItem(false)}} className="cancelButton">Cancel</Button>
                        <Button type="primary" onClick={()=>{delItem(false);deleteItem(id)}} className="deleteButton">Delete</Button>
                    </div>
                </div>
            </div>
        </>
    )
}