import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";

const validateInfo = (name, value, values) => {
    // console.log({ name, value, values });
    let {
        // firstName,
        // lastName,
        // userName,
        // email,
        password,
        confirmPassword,
    } = values;
    let error = { [name]: {} };
    // //console.log(error);
    switch (name) {
        case "firstName":
            if (!value.trim()) {
                error.firstName.msg = "";
                error.firstName.status = true;
            } else {
                error.firstName.msg = "";
                error.firstName.status = false;
            }
            //console.log(error);
            return error;

        case "lastName":
            if (!value.trim()) {
                error.lastName.msg = "";
                error.lastName.status = true;
            } else {
                error.lastName.msg = "";
                error.lastName.status = false;
            }
            //console.log(error);
            return error;

        case "userName":
            if (!value.trim()) {
                error.userName.msg = "";
                error.userName.status = true;
            } else if (value.trim().length < 4) {
                error.userName.msg = "minimum of 4 characters required";
                error.userName.status = true;
            } else {
                error.userName.msg = "";
                error.userName.status = false;
            }
            //console.log(error);
            return error;

        case "email":
            if (!value.trim()) {
                error.email.msg = "";
                error.email.status = true;
            } else if (!validateEmail(value.trim())) {
                error.email.msg = "Invalid Email";
                error.email.status = true;
            } else {
                error.email.msg = "";
                error.email.status = false;
            }
            //console.log(error);
            return error;

        case "password":
            if (!value) {
                error.password.msg = "password is required";
                error.password.status = true;
            } else if (!validatePassword(value)) {
                // error.password.msg = "password must be at least 8 characters";
                error.password.msg = "invalid password";
                error.password.status = true;
            } else if (confirmPassword !== "" && value !== confirmPassword) {
                console.log({ confirmPassword });
                error.password.msg = "passwords do not match";
                error.password.status = true;
            } else if (value === confirmPassword) {
                error.password.msg = "";
                error.password.status = false;
                error.confirmPassword = {
                    msg: "",
                    status: false,
                };
            }
            // else {
            //     error.password.msg = "";
            //     error.password.status = false;

            //     error.confirmPassword = {
            //         msg: "",
            //         status: false,
            //     };
            // }
            //console.log(error);
            return error;

        case "confirmPassword":
            if (!value) {
                error.confirmPassword.msg = "Please confirm password";
                error.confirmPassword.status = true;
            } else if (value !== password) {
                error.confirmPassword.msg = "Passwords do not match";
                error.confirmPassword.status = true;
            } else if (value === password) {
                error.confirmPassword.msg = "";
                error.confirmPassword.status = false;

                error.password = {
                    msg: "",
                    status: false,
                };
            }
            // else {
            //     error.confirmPassword.msg = "";
            //     error.confirmPassword.status = false;

            //     error.password = {
            //         msg: "",
            //         status: false,
            //     };
            // }
            //console.log(error);
            return error;

        case "country":
            if (value === "select options") {
                error.country.msg = "Please select your country";
                error.country.status = true;
            } else {
                error.country.msg = "";
                error.country.status = false;
            }
            return error;

        default:
            break;
    }
};

export default validateInfo;
