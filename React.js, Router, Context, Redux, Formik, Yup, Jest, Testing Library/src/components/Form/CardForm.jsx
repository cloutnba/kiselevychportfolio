import Input from "./Input";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {actionClearCart} from "../../reducers/items.reducer";
import './CardForm.scss';
import PropTypes from "prop-types";
import Header from "../Header";

function CardForm({setRerender}) {
    const dispatch = useDispatch();
    const cart = JSON.parse(localStorage.getItem("cart"));
    const order = cart.map(item => item.name).toString();

    return (
        <Formik
            initialValues={{
                firstName: "",
                secondName: "",
                age: "",
                delivery: "",
                phone: "",
            }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .min(2, "Занадто коротке ім'я")
                    .max(10, "Занадто довге ім'я")
                    .required("Поле обов'язкове до заповнення"),
                secondName: Yup.string()
                    .min(5, "Занадто коротке прізвище")
                    .max(12, "Занадто довге прізвище")
                    .required("Поле обов'язкове до заповнення"),
                age: Yup.number()
                    .min(18, "Продаж від 18 років")
                    .max(99, "Введіть коректний вік")
                    .required("Поле обов'язкове до заповнення"),
                delivery: Yup.string()
                    .min(10, "Занадто коротка адреса")
                    .max(30, "Занадто довга адреса")
                    .required("Поле обов'язкове до заповнення"),
                phone:  Yup.number()
                    .required("Поле обов'язкове до заповнення"),
            })}
            onSubmit={(values) => {
                console.log(values,order)
                dispatch(actionClearCart());
                setRerender();
            }}
        >
            <Form className="cart-form">
                <fieldset className="form-block">
                    <legend>Платіжна інформація</legend>
                    <Input label="Ім'я" placeholder="Ім'я" type="text" name="firstName"/>
                    <Input label="Прізвище" placeholder="Прізвище" type="text" name="secondName"/>
                    <Input label="Вік" placeholder="Вік" type="number" name="age"/>
                    <Input label="Адреса доставки" placeholder="Адреса доставки" type="text" name="delivery"/>
                    <Input label="Телефон" placeholder="Телефон" type="number" name="phone"/>
                    <button type="submit" className="cart-button">Оплатити</button>
                </fieldset>

            </Form>
        </Formik>
    )
}

Header.propTypes = {
    setRerender: PropTypes.func,
}

export default CardForm;
