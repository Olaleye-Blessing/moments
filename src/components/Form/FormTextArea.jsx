const FormTextArea = ({ name, value, handleChange }) => {
    return (
        <div className="form__control">
            <textarea
                className="form__textarea"
                id={name}
                name={name}
                rows="9"
                cols="33"
                placeholder="place your text here"
                value={value}
                onChange={handleChange}
            ></textarea>
            <label htmlFor={name} className="form__label">
                {name}
            </label>
        </div>
    );
};

export default FormTextArea;
