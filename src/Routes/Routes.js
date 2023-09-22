import {Routes as AppRoute,Route} from "react-router-dom";
import DashBoard from "../components/Dashboard/DashBoard";
import CreatedItems from "../components/CreatedItems/CreatedItems";
import BrowseItems from "../components/BrowseItems/BrowseItems";
import ProductDetail from "../components/Product Detail/ProductDetail";
import Cart from "../components/Cart/Cart";

export default function Routes(){
    return(
        <AppRoute>
            <Route path="/" element={<DashBoard/>}/>
            <Route path="view created items" element={<CreatedItems/>}/>
            <Route path="browse items" element={<BrowseItems/>}/>
            <Route path="browse items/:id" element={<ProductDetail/>}/>
            <Route path="cart" element={<Cart/>}/>
        </AppRoute>
    )
}