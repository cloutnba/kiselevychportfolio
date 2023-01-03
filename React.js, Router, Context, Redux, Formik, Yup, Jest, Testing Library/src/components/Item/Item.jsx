import {useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Button from "../Button";
import {useLocation} from "react-router-dom";
import {ReactComponent as FavoriteSvg} from "./icons/favorite.svg";
import {ReactComponent as UnFavoriteSvg} from "./icons/unFavorite.svg";
import {ReactComponent as CancelSvg} from "./icons/cancel.svg";
import './Item.scss';
import {ItemContext} from "../../context";



function Item({data, setRerender, rerender, isFavSvg, isCartBtn, handlerToggleModal}) {
    const [isFavorite, setIsFavorite] = useState(false);
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    const {isColumn} = useContext(ItemContext);

    useEffect(() => {
        favorites.map((item) => {
            if (item.article === data.article) {
                setIsFavorite(true);
            }
        })
    })

    const handlerCurrentItem = (currentItem) => {
        localStorage.setItem("currentItem", JSON.stringify(currentItem));
    }

    const handleAddToFavoriteList = () => {
        const currentItem = JSON.parse(localStorage.getItem("currentItem"));

        localStorage.setItem("favorites", JSON.stringify([...favorites, currentItem]));
        setIsFavorite(!isFavorite);
        setRerender(!rerender);
    }

    const handleRemoveFromFavoriteList = () => {
        const currentItem = JSON.parse(localStorage.getItem("currentItem")); // Беру текущий айтем который хотим удалить.

        const indexOfObj = favorites.findIndex((obj) => {
            return obj.article === currentItem.article; // находим его индекс в массиве избранных
        });


        const newFavorites = [...favorites.slice(0, indexOfObj), ...favorites.slice(indexOfObj + 1, favorites.length)]; // Создаем новый массив без этого айтема

        localStorage.setItem("favorites", JSON.stringify(newFavorites)); // обновляем локал сторедж
        setIsFavorite(!isFavorite);
        setRerender(!rerender);
    }


    const {name, price, img, article, color} = data;

    const location = useLocation();


    return (
        <>
            <div className={location.pathname === '/cart' || isColumn ? "item--cart item" : "item"}>
                <div className={location.pathname === '/cart' || isColumn ? "item__logo-container--cart " : "item__logo-container"}>
                    <img src={img} alt={name}
                         className={location.pathname === '/cart' || isColumn ? "item__image--cart item__image" : "item__image"}/>
                </div>
                <div
                    className={location.pathname === '/cart' || isColumn ? "item__content-container--cart" : "item__content-container"}>
                    <h3 className={"item__name"}>{name}</h3>
                    <p className={"item__article"}>Article: {article}</p>
                    <p className={"item__color"}>Color: {color}</p>
                    <p className={"item__price"}>Price: <span className="item__price--bold">{price} UAH</span></p>
                </div>
                <div
                    className={location.pathname === '/cart' || isColumn ? "item__buttons-container--cart" : "item__buttons-container"}>
                    {isCartBtn && <Button className="item__add-btn" onClickHandler={() => {
                        handlerCurrentItem(data);
                        handlerToggleModal();
                    }}>ADD TO CART
                    </Button>}

                    {isFavSvg && <Button className="item__favorite-btn" onClickHandler={() => {
                        handlerCurrentItem(data);
                        isFavorite ? handleRemoveFromFavoriteList() : handleAddToFavoriteList();
                    }}>
                        {isFavorite ? <FavoriteSvg/> : <UnFavoriteSvg/>}
                    </Button>}

                    {location.pathname === '/cart' ? <Button
                        className="cancel-btn"
                        onClickHandler={() => {
                            handlerCurrentItem(data);
                            handlerToggleModal()
                        }
                        }><CancelSvg/></Button> : null}
                </div>
            </div>

        </>

    )
}

Item.propTypes = {
    setRerender: PropTypes.func,
    rerender: PropTypes.bool,
    isFavSvg: PropTypes.bool,
    isCartBtn: PropTypes.bool,
    handlerToggleModal: PropTypes.func,
    data: PropTypes.object,
}

Item.defaultProps = {
    isFavSvg: true,
    isCartBtn: true,
}

export default Item;
