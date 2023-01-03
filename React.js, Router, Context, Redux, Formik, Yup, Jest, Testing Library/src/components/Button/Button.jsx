import React, {Component} from "react";
import './Button.scss';
import PropTypes from "prop-types";



class Button extends Component{
    render() {
        const {children, className, onClickHandler} = this.props;

        return(
            <button className={className} type="button" onClick={onClickHandler}>{children}</button>
        )
    }
}

Button.propTypes = {
    className: PropTypes.string,
    onClickHandler: PropTypes.func,
}


export default Button;
