const FormButton = ({ text, type, classname, disabled, handleClick }) => {
    return (
        <div className="form__control">
            <button
                className={`form__button btn ${classname}`}
                type={type}
                onClick={handleClick}
                disabled={disabled}
            >
                {/* form__button-submit */}
                {text}
            </button>
        </div>
    );
};

FormButton.defaultProps = {
    handleClick: null,
    disabled: false,
};

export default FormButton;
