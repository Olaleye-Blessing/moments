const getBaseUrl = () => {
    return process.env.NODE_ENV === "development"
        ? "http://localhost:7000"
        : "https://wahala-movie.herokuapp.com";
};

export default getBaseUrl;
