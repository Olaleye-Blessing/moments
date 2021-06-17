const FormText = ({
    type,
    label,
    name,
    value,
    handleChange,
    placeholder,
    required,
    children,
    handleKeyDown,
    errorClass,
}) => {
    return (
        <>
            <div className="form__control">
                <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder || name}
                    className={`form__input ${errorClass}`}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    onKeyDown={handleKeyDown}
                />
                <label htmlFor={name} className="form__label">
                    {label || name}
                </label>
                {required && (
                    <span
                        className={`form__input-required`}
                        style={{
                            backgroundColor: `${
                                errorClass === "valid"
                                    ? "green"
                                    : errorClass === "invalid"
                                    ? "red"
                                    : ""
                            }`,
                        }}
                    >
                        required
                    </span>
                )}
                {children}
            </div>
        </>
    );
};

FormText.defaultProps = {
    type: "text",
    required: false,
    handleKeyDown: null,
    errorClass: "",
};

export default FormText;
