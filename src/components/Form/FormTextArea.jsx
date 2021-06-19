const FormTextArea = ({
    name,
    value,
    handleChange,
    placeholder,
    rows,
    cols,
}) => {
    return (
        <div className="form__control">
            <textarea
                className="form__textarea"
                id={name}
                name={name}
                rows={rows}
                cols={cols}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            ></textarea>
            {/* <label htmlFor={name} className="form__label">
                {name}
            </label> */}
            {name && (
                <label htmlFor={name} className="form__label">
                    {name}
                </label>
            )}
        </div>
    );
};

FormTextArea.defaultProps = {
    placeholder: "place your text here",
    rows: 9,
    cols: 33,
};

export default FormTextArea;
