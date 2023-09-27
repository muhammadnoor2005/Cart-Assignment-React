import "./CreateEditItem.scss";
import { HiOutlineCamera } from "react-icons/hi2";
import { useState,useRef,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Input} from "antd";
const { TextArea } = Input;



export default function CreateEditItem(props){
    const {pathname} = useLocation();
    const [image,setImage] = useState();
    const [base64Img,setBase64Img] = useState('');
    const [decodedImg,setDecodedImg] = useState('');
    const inputRef = useRef(null);

    
    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const getBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBase64Img(reader.result);
        };
    };

    if(image){
        getBase64(image);
    }
    
    useEffect(() => {   
        if(base64Img){
            const base64Data = base64Img.split(",")[1];
            const decodeImg = `data:image/jpg;base64,${base64Data}`;
            setDecodedImg(decodeImg);
        }

    },[base64Img]);

    const removeImg = () => {
        setImage(null);
        setBase64Img(null);
        setDecodedImg(null);
    }

    let editDivTitle;
    let submitButtonVal;

    if (pathname === "/view%20created%20items"){
        editDivTitle = "Edit Item";
        submitButtonVal = "Edit";
    };
    if (pathname === "/"){
        editDivTitle = "Create Item";
        submitButtonVal = "Create";
    };
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
        <form className="createItemDialogBox" onSubmit={(event)=>{uploadItem(event,titleVal,descVal,priceVal,base64Img)}}>
            <div className="createItemHeading">{editDivTitle}</div>
            <Input placeholder="Product Title" onChange={getTitleVal} maxLength={20} minLength={6} required={true}/>
            <Input type="number" placeholder="Product Price" onChange={getPriceVal} className="productPrice" minLength={2} required={true}/>
            <TextArea rows={4} placeholder="Product Description" maxLength={150} onChange={getDescVal} minLength={40} required={true}/>
            {decodedImg?
            <div className="uploadedImgPreviewDiv">
                <img src={decodedImg} alt="decodedImg" className="uploadedImg"/>
                <span className="removeImgSpan" onClick={removeImg}>Remove image</span>
            </div>
            :
            <div className="uploadImgDiv" onClick={handleImageClick}>
                <input type="file" ref={inputRef} style={{display:"none"}} onChange={handleImageUpload} required/>
                <HiOutlineCamera style={{color:"gray"}}/>
                <span className="uploadImgSpan">Upload product image</span>
            </div>
             }
            
            

            <div className="cancelCreateButtonsDiv">
                <Button type="primary" className="cancelCreating" onClick={()=>{setBool(false)}}>Cancel</Button>
                <Button type="primary" htmlType="submit" className="createItemConfirm" >{submitButtonVal}</Button>
            </div>
        </form>
    </div>
    )
}