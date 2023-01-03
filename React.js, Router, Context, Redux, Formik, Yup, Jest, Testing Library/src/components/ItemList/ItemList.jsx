
import './ItemList.scss';
import Item from "../Item";
import Modal from "../Modal";

import {actionSetModal} from "../../reducers/items.reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectorIsModal} from "../../selectors";
import {useLocation} from "react-router-dom";
import CardForm from "../Form";
import PropTypes from "prop-types";



function ItemList({items, setRerender, rerender, isFavSvg, className, isCartBtn}){
    const dispatch = useDispatch();
    const isModal = useSelector(selectorIsModal);
    const cart = JSON.parse(localStorage.getItem("cart"));

    const handlerToggleModal = () => {
        dispatch(actionSetModal(isModal));
    }

    const handlerAddItem = () => {
        const currentItem = JSON.parse(localStorage.getItem("currentItem"));


        localStorage.setItem("cart", JSON.stringify([...cart, currentItem]));
        dispatch(actionSetModal(isModal));
        setRerender(!rerender);
    }

    const handleRemoveFromCart = () => {
        const currentItem = JSON.parse(localStorage.getItem("currentItem"));

        const indexOfObj = cart.findIndex((obj) => {
            return obj.article === currentItem.article;
        });

        const newCart = [...cart.slice(0, indexOfObj), ...cart.slice(indexOfObj + 1, cart.length)];
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch(actionSetModal(isModal));
        setRerender(!rerender);
    }

    const location = useLocation();

    return(
        <div className="container">
            <div className={className}>
                {items.map((item, id) => <Item
                    key={id}
                    data={item}
                    setRerender={setRerender}
                    rerender={rerender}
                    isFavSvg={isFavSvg}
                    isCartBtn={isCartBtn}
                    handlerToggleModal={handlerToggleModal}
                />)}

                {isModal && <Modal
                    text={location.pathname === '/cart' ? "Натисніть ОК, щоб видалити товар з кошику" : "Натисніть ОК, щоб додати товар у кошик"}
                    onClickHandler={location.pathname === '/cart' ? handleRemoveFromCart : handlerAddItem}
                    closeModal={handlerToggleModal}
                />}

                {location.pathname === '/cart' && <CardForm setRerender={setRerender}/>}
            </div>
        </div>
    )
}


ItemList.propTypes = {
    items: PropTypes.array,
    className: PropTypes.string,
    setRerender: PropTypes.func,
    rerender: PropTypes.bool,
    isFavSvg: PropTypes.bool,
    isCartBtn: PropTypes.bool,
    handlerToggleModal: PropTypes.func,
    data: PropTypes.object,
}

ItemList.defaultProps = {
    className: "item-wrapper",
    isFavSvg: true,
    isCartBtn: true,
}

export default ItemList;
