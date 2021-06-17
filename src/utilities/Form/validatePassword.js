let regex = {
    "uppercase": /(?=.*?[A-Z])/,
    "lowercase": /(?=.*?[a-z])/,
    "digit": /(?=.*?[0-9])/,
    "specialCharacter": /(?=.*?[#?!@$%^&*-])/,
    "all": /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};

const validatePasswordErrors = (password) => {
    let errors = {
        "length": password.length >= 8,
        "uppercase": regex["uppercase"].test(password),
        "lowercase": regex["lowercase"].test(password),
        "digit": regex["digit"].test(password),
        "specialCharacter": regex["specialCharacter"].test(password),
    };

    return errors;
};

export const validatePassword = (password) => regex["all"].test(password);

export default validatePasswordErrors;

/*
At least one upper case English letter, (?=.*?[A-Z])
At least one lower case English letter, (?=.*?[a-z])
At least one digit, (?=.*?[0-9])
At least one special character, (?=.*?[#?!@$%^&*-])
Minimum eight in length .{8,} (with the anchors)
*/
