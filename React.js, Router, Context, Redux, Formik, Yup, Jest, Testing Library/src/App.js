
import './App.css';
import {Routes, Route} from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<ProductsPage/>}/>
                <Route path="cart" element={<CartPage/>}/>
                <Route path="favorite" element={<FavoritePage/>}/>
            </Routes>
        </>
    )
}

export default App;
