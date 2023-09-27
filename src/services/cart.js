export function gettingParsedItems(){
    const items = localStorage.getItem("items");
    const parsedItems = JSON.parse(items);
    return parsedItems;
}

export function addItem(id){
    const items = gettingParsedItems();

    items.forEach((item) => {
        if(item.id === id){
            item.count += 1;
        }
    });
    localStorage.removeItem("items");
    localStorage.setItem("items",JSON.stringify(items));
};

export function deleteItem(id){
    const items = gettingParsedItems();

    const find = items.find(p => p.id === id);
    const index = items.indexOf(find);

    items.splice(index,1);

    localStorage.removeItem("items");
    localStorage.setItem("items",JSON.stringify(items));
    alert("Item Deleted")
}

export function decreaseItem(id){
    const items = gettingParsedItems();
    items.forEach((item) => {
        if(item.id === id){
            item.count -= 1;
        }
    });
    localStorage.removeItem("items");
    localStorage.setItem("items",JSON.stringify(items));
    
};

export function editItem(titleVal,descVal,priceVal,id,base64Img){
    const items = gettingParsedItems();

    items.forEach((item) => {
        if(item.id === id){
            item.titleVal = titleVal;
            item.descVal = descVal;
            item.priceVal = priceVal;
            item.productImg = base64Img;
        }
    });
    localStorage.removeItem("items");
    localStorage.setItem("items",JSON.stringify(items));
}

export function removeCartItem(id){
    const items = gettingParsedItems();
    items.forEach((item) => {
        if(item.id === id){
            item.count = 0;
        }
    })
    localStorage.removeItem("items");
    localStorage.setItem("items",JSON.stringify(items));
}

export function cartItemsTotal(){
    const items = gettingParsedItems();
    let itemAmount = 0;
    items.forEach((item) => {
        if(item.count !== 0){
            itemAmount += item.count * item.priceVal;
        }
    });
    return itemAmount;
}
