import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    AiFillExclamationCircle,
    AiFillCheckCircle,
    // AiOutlineEye,
    // AiOutlineEyeInvisible,
} from "react-icons/ai";

import Alert from "../../components/Alert";
import FormButton from "../../components/Form/FormButton";
import FormFile from "../../components/Form/FormFile";
import FormText from "../../components/Form/FormText";
import HomeLogo from "../../components/HomeLogo";
import { useMomentContext } from "../../context/MomentsContext";
import useSignUpForm from "../../hook/useSignUpForm";
// import { actions } from "../../reducer/actions";
// import { signup } from "../../reducer/fetchActions";
// import { imagesToBase64 } from "../../utilities/imageToBase64";
import validateInfo from "../../utilities/Form/validateSignUpInfo";
import validatePasswordErrors from "../../utilities/Form/validatePassword";
import ToggleButton from "../../components/ToggleButton";

const Signup = () => {
    let { state } = useMomentContext();
    let {
        handleChange,
        handleImageChange,
        values,
        errors,
        handleSubmit,
        touched,
        handleKeyDown,
        disabledSubmitBtn,
    } = useSignUpForm(validateInfo);

    const fieldError = (field) => {
        const hasError = errors[field].status;
        const shouldShow = touched[field];
        if (!shouldShow) {
            return "";
        }
        return hasError ? "invalid" : "valid";
    };

    const [passwordConditions, setpasswordConditions] = useState([
        {
            label: "uppercase",
            text: "At least one upper case English letter",
            valid: false,
        },
        {
            label: "lowercase",
            text: "At least one lower case English letter",
            valid: false,
        },
        {
            label: "digit",
            text: "At least one digit",
            valid: false,
        },
        {
            label: "specialCharacter",
            text: "At least one special character",
            valid: false,
        },
        {
            label: "length",
            text: "Minimum of eight characters",
            valid: false,
        },
    ]);

    const [showPswd, setShowPswd] = useState(false);
    const [showConfirmPswd, setShowConfirmPswd] = useState(false);

    useEffect(() => {
        let result = validatePasswordErrors(values.password);

        let pswdConditions = [...passwordConditions];

        pswdConditions = pswdConditions.map((condition) => {
            let { label } = condition;
            let newCond = { ...condition };
            newCond.valid = result[label];
            return newCond;
        });

        setpasswordConditions(pswdConditions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.password]);

    let { errorAlert } = state;

    return (
        <section data-form="auth">
            {errorAlert.show && <Alert {...errorAlert} />}
            <h2 className="form__home">
                <HomeLogo />
            </h2>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Create An Account</h2>
                <FormText
                    name="firstName"
                    label="First Name"
                    placeholder="first name"
                    value={values.firstName}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "firstName")}
                    errorClass={fieldError("firstName")}
                    required={true}
                >
                    {errors.firstName.status && (
                        <small className="form__input-error">
                            {errors.firstName.msg}
                        </small>
                    )}
                    {fieldError("firstName") === "invalid" && (
                        <AiFillExclamationCircle className="form__input-icon form__input-icon-error" />
                    )}
                    {fieldError("firstName") === "valid" && (
                        <AiFillCheckCircle className="form__input-icon form__input-icon-valid" />
                    )}
                </FormText>
                <FormText
                    name="lastName"
                    label="last Name"
                    placeholder="last name"
                    value={values.lastName}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "lastName")}
                    errorClass={fieldError("lastName")}
                    required={true}
                >
                    {errors.lastName.status && (
                        <small className="form__input-error">
                            {errors.lastName.msg}
                        </small>
                    )}
                    {fieldError("lastName") === "invalid" && (
                        <AiFillExclamationCircle className="form__input-icon form__input-icon-error" />
                    )}
                    {fieldError("lastName") === "valid" && (
                        <AiFillCheckCircle className="form__input-icon form__input-icon-valid" />
                    )}
                </FormText>
                <FormText
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "email")}
                    errorClass={fieldError("email")}
                    required={true}
                >
                    {errors.email.status && (
                        <small className="form__input-error">
                            {errors.email.msg}
                        </small>
                    )}
                    {fieldError("email") === "invalid" && (
                        <AiFillExclamationCircle className="form__input-icon form__input-icon-error" />
                    )}
                    {fieldError("email") === "valid" && (
                        <AiFillCheckCircle className="form__input-icon form__input-icon-valid" />
                    )}
                </FormText>
                <FormText
                    type={showPswd ? "text" : "password"}
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "password")}
                    errorClass={fieldError("password")}
                    required={true}
                >
                    <ToggleButton
                        onClick={() => setShowPswd((prev) => !prev)}
                        showPswd={showPswd}
                    />
                    {errors.password.status && (
                        <small className="form__input-error">
                            {errors.password.msg}
                        </small>
                    )}
                    {fieldError("password") === "invalid" && (
                        <AiFillExclamationCircle className="form__input-icon form__input-icon-error" />
                    )}
                    {fieldError("password") === "valid" && (
                        <AiFillCheckCircle className="form__input-icon form__input-icon-valid" />
                    )}
                </FormText>
                {fieldError("password") === "invalid" && (
                    <ul className="form__password-errors">
                        {passwordConditions.map((condition) => {
                            let { label, text, valid } = condition;
                            return (
                                <li
                                    key={label}
                                    className={
                                        valid
                                            ? "form__input-icon-valid"
                                            : "form__input-icon-error"
                                    }
                                >
                                    {text}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <FormText
                    type={showConfirmPswd ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="confirm password"
                    value={values.confirmPassword}
                    handleChange={handleChange}
                    handleKeyDown={(e) => handleKeyDown(e, "confirmPassword")}
                    errorClass={fieldError("confirmPassword")}
                    required={true}
                >
                    <ToggleButton
                        onClick={() => setShowConfirmPswd((prev) => !prev)}
                        showPswd={showConfirmPswd}
                    />
                    {errors.confirmPassword.status && (
                        <small className="form__input-error">
                            {errors.confirmPassword.msg}
                        </small>
                    )}
                    {fieldError("confirmPassword") === "invalid" && (
                        <AiFillExclamationCircle className="form__input-icon form__input-icon-error" />
                    )}
                    {fieldError("confirmPassword") === "valid" && (
                        <AiFillCheckCircle className="form__input-icon form__input-icon-valid" />
                    )}
                </FormText>
                <FormFile name="profilePic" handleChange={handleImageChange} />
                <FormButton
                    text="create"
                    type="submit"
                    classname={`form__button-submit ${
                        disabledSubmitBtn ? "disabled" : "not"
                    }`}
                    disabled={disabledSubmitBtn}
                />
            </form>
            <p className="form__other">
                Already have an account? <Link to="/auth/login">Login</Link>
            </p>
            <p className="form__other">
                <Link to="/auth/forgotPassword">Forgot Password?</Link>
            </p>
        </section>
    );
};

export default Signup;
