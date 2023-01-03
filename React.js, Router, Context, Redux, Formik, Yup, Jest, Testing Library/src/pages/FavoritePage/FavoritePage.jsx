import PageWrapper from "../../components/PageWrapper";
import {useState} from "react";
import Item from "../../components/Item";
import ItemList from "../../components/ItemList";

function FavoritePage() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    const [rerender, setRerender] = useState(false);


    return(
        <PageWrapper>
            <ItemList items={favorites} setRerender={setRerender} rerender={rerender}/>
        </PageWrapper>
    )
}

export default FavoritePage;
