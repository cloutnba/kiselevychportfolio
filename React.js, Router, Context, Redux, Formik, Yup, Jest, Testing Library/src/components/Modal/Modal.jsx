import { useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import './Modal.scss';
import Button from "../Button";


function Modal({text,onClickHandler, closeModal}) {
    const wrapperRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return (() => {
            document.removeEventListener("mousedown", handleClickOutside);
        })
    })

    const handleClickOutside = (event) => {
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            closeModal();
        }
    }

    return(
        <div className="modal-wrapper">
            <div className="modal" ref={wrapperRef}>
                <div className="modal-box">
                    <Button className="modal-close" onClickHandler={closeModal}>
                        <svg viewBox="0 0 16 16" width="16" height="16">
                            <path
                                d="m9.3 8 6.1-6.1c.4-.4.4-.9 0-1.3s-.9-.4-1.3 0L8 6.7 1.9.6C1.6.3 1 .3.6.6c-.3.4-.3 1 0 1.3L6.7 8 .6 14.1c-.4.4-.3.9 0 1.3l.1.1c.4.3.9.2 1.2-.1L8 9.3l6.1 6.1c.4.4.9.4 1.3 0s.4-.9 0-1.3L9.3 8z"/>
                        </svg>
                    </Button>
                    <div className="modal-content">
                        <div className="modal-text">
                            {text}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="button-wrapper">
                            <Button className="btn" onClickHandler={onClickHandler}>ОК</Button>
                            <Button className="btn" onClickHandler={closeModal}>НІ</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    text: PropTypes.string,
    handlerAddItem: PropTypes.func,
    closeModal: PropTypes.func,
}

export default Modal;
