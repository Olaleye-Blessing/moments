import { useState } from "react";
import { useHistory } from "react-router";

const useSignUpForm = (validate) => {
    let history = useHistory();

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
        profilePic: { msg: "", status: true },
    });

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

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        profilePic: false,
    });

    const handleKeyDown = (name) => {
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors(validate(values));
        console.log("submited");
        alert("submited");
        setValues({
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            country: "",
        });
        history.replace("/");
    };

    return {
        handleChange,
        values,
        errors,
        handleSubmit,
        touched,
        handleKeyDown,
    };
};

export default useSignUpForm;
