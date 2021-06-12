import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormButton from "../../components/Form/FormButton";
import FormText from "../../components/Form/FormText";
import HomeLogo from "../../components/HomeLogo";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { login } from "../../reducer/fetchActions";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await login(loginData);
            if (res.status === "success") {
                // console.log("yes");
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
            console.log(error);
            let message = {
                show: true,
                type: "invalid",
                msg: `${error.message}.`,
            };
            dispatch({ type: actions.ERROR, payload: message });
        }
    };

    return (
        <section data-form="auth">
            {errorAlert.show && <Alert {...errorAlert} />}
            <h2 className="form__home">
                <HomeLogo />
            </h2>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Sign In To Your Account</h2>
                <FormText
                    type="email"
                    name="email"
                    value={loginData.email}
                    handleChange={handleChange}
                />
                <FormText
                    type="password"
                    name="password"
                    value={loginData.password}
                    handleChange={handleChange}
                />
                <FormButton
                    text="login"
                    type="submit"
                    classname="form__button-submit"
                />
            </form>
            <p className="form__other">
                Don't have an account? <Link to="/auth/signup">Sign up</Link>
            </p>
            <p className="form__other">
                <Link to="/forgotPassword">Forgot Password?</Link>
            </p>
        </section>
    );
};

export default Login;
