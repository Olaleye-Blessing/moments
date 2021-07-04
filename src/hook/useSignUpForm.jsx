import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useMomentContext } from "../context/MomentsContext";
import { actions } from "../reducer/actions";
import { signup } from "../reducer/fetchActions/auth";
// import { signup } from "../reducer/fetchActions";
import { preventUnnecessaryKeys } from "../utilities/Form/preventUnnecessaryKeys";
import { imagesToBase64 } from "../utilities/imageToBase64";

const useSignUpForm = (validate) => {
    let history = useHistory();
    let { dispatch } = useMomentContext();

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
    });

    // const [errors, setErrors] = useState({});
    const [errors, setErrors] = useState({
        firstName: { msg: "", status: true },
        lastName: { msg: "", status: true },
        email: { msg: "", status: true },
        password: { msg: "", status: true },
        confirmPassword: { msg: "", status: true },
        // profilePic: { msg: "", status: true },
    });

    const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);

    useEffect(() => {
        setDisabledSubmitBtn(
            Object.keys(errors).some((field) => errors[field].status === true)
        );
    }, [errors]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...errors,
            ...validate(name, value, values),
        });
    };

    const handleImageChange = async (e) => {
        let image = await imagesToBase64(e);
        image = image[0];
        // setSignUpData({ ...signUpData, profilePic: image });
        setValues({ ...values, profilePic: image });
    };

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        profilePic: false,
    });

    const handleKeyDown = (e, name) => {
        if (!preventUnnecessaryKeys(e)) return;
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledSubmitBtn(true);

        try {
            let res = await signup(values);
            console.log(res);
            if (res.status === "success") {
                dispatch({ type: actions.AUTHENTICATION, payload: res.user });
                history.replace("/");
            }
        } catch (error) {
            dispatch({ type: actions.ERROR, payload: error });
            setDisabledSubmitBtn(false);
        }
    };

    return {
        handleChange,
        handleImageChange,
        values,
        errors,
        handleSubmit,
        touched,
        handleKeyDown,
        disabledSubmitBtn,
    };
};

export default useSignUpForm;
