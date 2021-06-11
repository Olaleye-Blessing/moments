const FormEmail = ({ label, name, value, handleChange, placeholder }) => {
    return (
        <div className="form__control">
            <input
                type="email"
                id={name}
                name={name}
                placeholder={placeholder || name}
                // placeholder={placeholder ? `${name} ${placeholder}` : name}
                className="form__input"
                value={value}
                onChange={handleChange}
            />
            <label htmlFor={name} className="form__label">
                {label || name}
            </label>
        </div>
    );
};

export default FormEmail;
