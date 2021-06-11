import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormButton from "../../components/Form/FormButton";
import FormText from "../../components/Form/FormText";
import HomeLogo from "../../components/HomeLogo";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import { signup } from "../../reducer/fetchActions";

const Signup = () => {
    let history = useHistory();
    let { dispatch, state } = useMomentContext();

    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        // profilePic: "",
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted....");
        try {
            let res = await signup(signUpData);
            console.log(res);
            if (res.status === "success") {
                dispatch({ type: actions.AUTHENTICATION, payload: res });
                history.replace("/");
            }
        } catch (error) {
            console.log(error);
            let message = {
                show: true,
                type: "invalid",
                msg: `${error.message}.`,
            };
            if (error.code === 400) {
                dispatch({ type: actions.ERROR, payload: message });
            }
        }
        // if (res) {
        //     localStorage.setItem("profile", JSON.stringify(res));
        //     history.replace("/");
        // }
    };
    let { errorAlert } = state;
    // console.log(errorAlert);

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
                    value={signUpData.firstName}
                    handleChange={handleChange}
                />
                <FormText
                    name="lastName"
                    label="last Name"
                    placeholder="last name"
                    value={signUpData.lastName}
                    handleChange={handleChange}
                />
                <FormText
                    type="email"
                    name="email"
                    value={signUpData.email}
                    handleChange={handleChange}
                />
                <FormText
                    type="password"
                    name="password"
                    value={signUpData.password}
                    handleChange={handleChange}
                />
                <FormText
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="confirm password"
                    value={signUpData.confirmPassword}
                    handleChange={handleChange}
                />
                {/* <FormText
                    name="profilePic"
                    label="Profile Picture"
                    placeholder="Profile Picture"
                    value={signUpData.profilePic}
                    handleChange={handleChange}
                /> */}
                <FormButton
                    text="create"
                    type="submit"
                    classname="form__button-submit"
                />
            </form>
            <p className="form__other">
                Already have an account? <Link to="/auth/login">Login</Link>
            </p>
            <p className="form__other">
                <Link to="/forgotPassword">Forgot Password?</Link>
            </p>
        </section>
    );
};

export default Signup;
