import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";

const validateInfo = (name, value, values) => {
    let { password, confirmPassword } = values;
    let error = { [name]: {} };
    // //console.log(error);
    switch (name) {
        case "firstName":
            if (!value.trim()) {
                error.firstName.msg = "provide your first name";
                error.firstName.status = true;
            } else {
                error.firstName.msg = "";
                error.firstName.status = false;
            }
            return error;

        case "lastName":
            if (!value.trim()) {
                error.lastName.msg = "provide last name";
                error.lastName.status = true;
            } else {
                error.lastName.msg = "";
                error.lastName.status = false;
            }
            return error;

        case "email":
            if (!value.trim()) {
                error.email.msg = "provide email";
                error.email.status = true;
            } else if (!validateEmail(value.trim())) {
                error.email.msg = "Invalid Email";
                error.email.status = true;
            } else {
                error.email.msg = "";
                error.email.status = false;
            }
            return error;

        case "password":
            if (!value) {
                error.password.msg = "password is required";
                error.password.status = true;
            } else if (!validatePassword(value)) {
                error.password.msg = "invalid password";
                error.password.status = true;
            }
            // else if (confirmPassword !== "" && value !== confirmPassword) {
            //     error.password.msg = "passwords do not match";
            //     error.password.status = true;
            //     error.confirmPassword = {
            //         msg: "passwords do not match",
            //         status: true,
            //     };
            // }
            else if (value === confirmPassword) {
                error.password.msg = "";
                error.password.status = false;
                error.confirmPassword = {
                    msg: "",
                    status: false,
                };
            }
            return error;

        case "confirmPassword":
            if (!value) {
                error.confirmPassword.msg = "Please confirm password";
                error.confirmPassword.status = true;
            }
            // else if (password !== "" && !validatePassword(password)) {
            //     error.password = {
            //         msg: "invalid password",
            //         status: true,
            //     };
            // }
            else if (value !== password) {
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

            return error;

        default:
            break;
    }
};

export default validateInfo;
