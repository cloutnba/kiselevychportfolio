import ItemList from "../../components/ItemList";
import {useContext, useEffect, useState} from "react";
import PageWrapper from "../../components/PageWrapper";
import {useDispatch, useSelector} from "react-redux";
import { selectorItemsList} from "../../selectors";
import {actionFetchItems} from "../../reducers";
import {ItemContext} from "../../context";


function ProductsPage() {
    const [rerender, setRerender] = useState(false);

    const dispatch = useDispatch();

    const items = useSelector(selectorItemsList);

    const {isColumn} = useContext(ItemContext);


    useEffect(() => {
        dispatch(actionFetchItems());
    }, [])

    const favorites = JSON.parse(localStorage.getItem("favorites"));
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (favorites === null) {
        localStorage.setItem("favorites", JSON.stringify([]));
    } else if (cart === null) {
        localStorage.setItem("cart", JSON.stringify([]));
    }


    return (
        <PageWrapper>
            <ItemList className={isColumn ? "item-wrapper--cart" : "item-wrapper" } items={items} setRerender={setRerender} rerender={rerender}/>
        </PageWrapper>

    )
}

export default ProductsPage;
