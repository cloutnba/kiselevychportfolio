import PropTypes from 'prop-types';
import {ReactComponent as CartSvg} from "./icons/cart.svg";
import {ReactComponent as FavoriteSvg} from "./icons/favorites.svg";
import './Header.scss';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ItemContext} from "../../context";


function Header({cart, favorites}) {
    const {isColumn, toggleIsColumn} = useContext(ItemContext);

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__logo">
                        <Link to="/">
                            <img src="https://www.prodj.com.ua/images/logo-prodj4.png" alt="Sound trade"
                                 className="logo"/>
                        </Link>
                    </div>
                    <div className="header__actions">
                        <div className="header__toggle-btn">
                            <h3>Row/Column</h3>
                            <label className="switch">
                                <input type="checkbox" checked={isColumn} onClick={toggleIsColumn}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="header__favorites-list">
                            <Link to="/favorite" className="icon-favorite">
                                <span className="count">{favorites}</span>
                                <FavoriteSvg/>
                            </Link>
                        </div>
                        <div className="header__cart-list">
                            <Link to="/cart" className="icon-cart">
                                <span className="count">{cart}</span>
                                <CartSvg/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    cart: PropTypes.number,
    favorites: PropTypes.number,
}

Header.defaultProps = {
    cart: 0,
    favorites: 0,
}

export default Header;
