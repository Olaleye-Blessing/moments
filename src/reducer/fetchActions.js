/* eslint-disable no-throw-literal */
import getBaseUrl from "./../utilities/getBaseUrl";

let baseUrl = getBaseUrl();

export const fetchPosts = async (signal) => {
    try {
        let req = await fetch(`${baseUrl}/moments`, {
            signal,
            // credentials: "include",
        });
        let res = await req.json();
        if (!(req.status >= 200 && req.status <= 299)) throw res;
        return res;
    } catch (error) {
        if (error.name !== "AbortError") throw error;
    }
};

export const createPost = async (moment) => {
    try {
        let req = await fetch(`${baseUrl}/moments`, {
            method: "POST",
            body: JSON.stringify(moment),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            credentials: "include",
        });
        let res = await req.json();
        if (!(req.status >= 200 && req.status <= 299))
            // eslint-disable-next-line no-throw-literal
            throw { ...res, code: req.status };
        return res;
    } catch (error) {
        throw error;
    }
};

export const updatePost = async (id, moment) => {
    let body = { _id: id, ...moment };

    try {
        let req = await fetch(`${baseUrl}/moments/${id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            credentials: "include",
        });
        let res = await req.json();
        if (!(req.status >= 200 && req.status <= 299)) throw res;
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (id) => {
    // let body = { _id: id };

    console.log("got here");
    try {
        await fetch(`${baseUrl}/moments/${id}`, {
            method: "DELETE",
            credentials: "include",
            // body: JSON.stringify(body),
            // headers: {
            //     "Content-Type": "application/json;charset=utf-8",
            // },
        });
    } catch (error) {
        console.log(error);
    }
};

export const signup = async (data) => {
    try {
        let req = await fetch(`${baseUrl}/auth/signup`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            credentials: "include",
        });
        let res = await req.json();

        if (!req.ok) {
            // throw res;
            throw { ...res, code: req.status };
        }
        return res;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const login = async (data) => {
    try {
        let req = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            credentials: "include",
        });
        let res = await req.json();

        if (!req.ok) {
            // throw res;
            throw { ...res, code: req.status };
        }
        return res;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const logout = async () => {
    try {
        let req = await fetch(`${baseUrl}/auth/logout`, {
            credentials: "include",
        });
        let res = await req.json();

        if (!req.ok) throw res;
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const momentDetails = async (id, signal) => {
    try {
        let req = await fetch(`${baseUrl}/moments/${id}`, {
            credentials: "include",
            signal,
        });
        let res = await req.json();

        if (!req.ok) throw res;
        return res;
    } catch (error) {
        if (error.name !== "AbortError") throw error;
    }
};
