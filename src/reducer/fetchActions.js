/* eslint-disable no-throw-literal */
import getBaseUrl from "./../utilities/getBaseUrl";

export const fetchPosts = async (signal) => {
    try {
        let req = await fetch(`${getBaseUrl()}/moments`, {
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
        let req = await fetch(`${getBaseUrl()}/moments`, {
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
        let req = await fetch(`${getBaseUrl()}/moments/${id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
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
        await fetch(`${getBaseUrl()}/moments/${id}`, {
            method: "DELETE",
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
        let req = await fetch(`${getBaseUrl()}/auth/signup`, {
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
        let req = await fetch(`${getBaseUrl()}/auth/login`, {
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
        let req = await fetch(`${getBaseUrl()}/auth/logout`);
        let res = await req.json();

        if (!req.ok) throw res;
        return res;
    } catch (error) {
        console.log(error);
    }
};
