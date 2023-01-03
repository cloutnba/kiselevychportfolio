import {Field, ErrorMessage} from "formik";

function Input({name, label, type, placeholder}) {
    return(
        <label className="form-input">
            <p className="form-label">{label}</p>
            <Field
                type={type}
                name={name}
                className="form-input"
                placeholder={placeholder}/>
            <ErrorMessage name={name} className="error-message" component="p"/>
        </label>
    )
}

export default Input;
