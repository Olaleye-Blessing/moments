const getBaseUrl = () => {
    return process.env.NODE_ENV === "development"
        ? "http://localhost:7000"
        : "https://momentss.herokuapp.com";
};

export default getBaseUrl;
