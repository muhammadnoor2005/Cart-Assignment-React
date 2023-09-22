import "./CreateEditItem.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Input} from "antd";
const { TextArea } = Input;


export default function CreateEditItem(props){
    const {pathname} = useLocation();
    
    let editDivTitle;
    let submitButtonVal;

    if (pathname === "/view%20created%20items"){
        editDivTitle = "Edit Item";
        submitButtonVal = "Edit"
    }
    if (pathname === "/"){
        editDivTitle = "Create Item";
        submitButtonVal = "Create";
    }
    const { setBool,uploadItem,creatItemBool } = props;
    const [titleVal,setTitleVal] = useState('');
    const [priceVal,setPriceVal] = useState('');
    const [descVal,setDescVal] = useState('');

    const getTitleVal = (e) => {
        setTitleVal(e.target.value);
    }
    const getPriceVal = (e) => {
        setPriceVal(e.target.value);
    }
    const getDescVal = (e) => {
        setDescVal(e.target.value);
    }
    return(
        <div className={creatItemBool?"createItemDialogBoxBG":"createItemDialogBoxHide"}>
        <form className="createItemDialogBox" onSubmit={(event)=>{uploadItem(event,titleVal,descVal,priceVal)}}>
            <div className="createItemHeading">{editDivTitle}</div>
            <Input placeholder="Product Title" onChange={getTitleVal} maxLength={20} minLength={6} required={true}/>
            <Input type="number" placeholder="Product Price" onChange={getPriceVal} className="productPrice" minLength={2} required={true}/>
            <TextArea rows={4} placeholder="Product Description" maxLength={150} onChange={getDescVal} minLength={40} required={true}/>

            <div className="cancelCreateButtonsDiv">
                <Button type="primary" className="cancelCreating" onClick={()=>{setBool(false)}}>Cancel</Button>
                <Button type="primary" htmlType="submit" className="createItemConfirm" >{submitButtonVal}</Button>
            </div>
        </form>
    </div>
    )
}