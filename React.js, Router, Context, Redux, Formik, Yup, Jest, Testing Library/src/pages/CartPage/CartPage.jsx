import PageWrapper from "../../components/PageWrapper";
import ItemList from "../../components/ItemList";
import {useState} from "react";

import {ReactComponent as EmptyCartSvg} from "./icons/empty-cart.svg";
import './CartPage.scss'
import CardForm from "../../components/Form";

function CartPage(){
    const cart = JSON.parse(localStorage.getItem("cart"));

    const [rerender, setRerender] = useState(false);

    return(
        <PageWrapper>
            {cart.length !== 0 ?
                <>
                    <ItemList items={cart} setRerender={setRerender} rerender={rerender} isFavSvg={false} className="item-wrapper--cart"  isCartBtn={false}/>
                </>
                :
                <div className="container">
                    <div className="empty-cart">Ви ще не додали жодного товару до кошику {<EmptyCartSvg className="empty-cart-icon"/>}</div>
                </div>

            }
        </PageWrapper>
    )
}

export default CartPage;
