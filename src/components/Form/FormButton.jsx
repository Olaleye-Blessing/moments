const FormButton = ({ text, type, classname, handleClick }) => {
    return (
        <div className="form__control">
            <button
                className={`form__button btn ${classname}`}
                type={type}
                onClick={handleClick}
            >
                {/* form__button-submit */}
                {text}
            </button>
        </div>
    );
};

FormButton.defaultProps = {
    handleClick: null,
};

export default FormButton;
