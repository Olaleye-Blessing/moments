import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormButton from "../../components/Form/FormButton";
import FormText from "../../components/Form/FormText";
import HomeLogo from "../../components/HomeLogo";
import ToggleButton from "../../components/ToggleButton";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { login } from "../../reducer/fetchActions/auth";
// import { login } from "../../reducer/fetchActions";

const Login = () => {
    let { state, dispatch } = useMomentContext();
    let { errorAlert } = state;
    let history = useHistory();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const [showPswd, setShowPswd] = useState(false);
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisableSubmitBtn(true);
        try {
            let res = await login(loginData);
            if (res.status === "success") {
                dispatch({ type: actions.AUTHENTICATION, payload: res.user });

                let message = {
                    show: true,
                    type: "valid",
                    msg: "successfully logged in. Redirecting in a second..",
                };
                dispatch({ type: actions.ERROR, payload: message });

                history.replace("/");
            }
        } catch (error) {
            setDisableSubmitBtn(false);
            dispatch({ type: actions.ERROR, payload: error });
        }
    };

    return (
        <section data-form="auth">
            {errorAlert.show && <Alert {...errorAlert} />}
            <h2 className="form__home">
                <HomeLogo />
            </h2>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <FormText
                    type="email"
                    name="email"
                    value={loginData.email}
                    handleChange={handleChange}
                />
                <FormText
                    type={showPswd ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    handleChange={handleChange}
                >
                    <ToggleButton
                        onClick={() => setShowPswd((prev) => !prev)}
                        showPswd={showPswd}
                    />
                </FormText>
                <FormButton
                    text="login"
                    type="submit"
                    // classname="form__button-submit"
                    classname={`form__button-submit ${
                        disableSubmitBtn ? "disabled" : ""
                    }`}
                    disabled={disableSubmitBtn}
                />
            </form>
            <p className="form__other">
                Don't have an account? <Link to="/auth/signup">Sign up</Link>
            </p>
            <p className="form__other">
                <Link to="/auth/forgotPassword">Forgot Password?</Link>
            </p>
        </section>
    );
};

export default Login;
