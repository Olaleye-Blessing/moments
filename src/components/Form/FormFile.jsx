const FormFile = ({ name, handleChange }) => {
    return (
        <div className="form__control" style={{ marginTop: "7rem" }}>
            <input
                type="file"
                id={name}
                name={name}
                className="form__input"
                accept="image/*"
                // multiple
                onChange={handleChange}
            />
            {/* <label htmlFor={name} className="form__label">
                {name}
            </label> */}
        </div>
    );
};

export default FormFile;
