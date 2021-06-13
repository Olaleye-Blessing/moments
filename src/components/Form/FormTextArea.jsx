const FormTextArea = ({ name, value, handleChange, placeholder }) => {
    return (
        <div className="form__control">
            <textarea
                className="form__textarea"
                id={name}
                name={name}
                rows="9"
                cols="33"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            ></textarea>
            <label htmlFor={name} className="form__label">
                {name}
            </label>
        </div>
    );
};

FormTextArea.defaultProps = {
    placeholder: "place your text here",
};

export default FormTextArea;
