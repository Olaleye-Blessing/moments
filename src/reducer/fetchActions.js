/* eslint-disable no-throw-literal */
import getBaseUrl from "./../utilities/getBaseUrl";

let baseUrl = getBaseUrl();

let headers = new Headers();
headers.set("Content-type", "application/json;charset=utf-8");

export const fetchData = async (
    url,
    method = "GET",
    signal = undefined,
    body = undefined
) => {
    let options = {
        method,
        headers,
        signal,
        body: JSON.stringify(body),
        credentials: "include",
    };
    try {
        let req = await fetch(`${baseUrl}${url}`, options);
        let res = await req.json();
        if (!(req.status >= 200 && req.status <= 299)) throw res;
        return res;
    } catch (error) {
        if (error.name !== "AbortError") {
            let message = {
                show: true,
                type: "invalid",
                msg: `${error.message}.`,
            };
            throw message;
        }
    }
};

export const fetchPosts = async (signal) =>
    await fetchData(`/moments`, "GET", signal);

export const createPost = async (moment) =>
    await fetchData(`/moments`, "POST", undefined, moment);

export const updatePost = async (id, moment) => {
    let body = { _id: id, ...moment };
    return await fetchData(`/moments/${id}`, "PATCH", undefined, body);
};

export const deletePost = async (id) => {
    await fetchData(`/moments/${id}`, "DELETE", undefined, undefined);
};

export const signup = async (data) =>
    await fetchData(`/auth/signup`, "POST", undefined, data);

export const login = async (data) =>
    await fetchData(`/auth/login`, "POST", undefined, data);

export const logout = async () =>
    await fetchData(`/auth/logout`, "GET", undefined, undefined);

export const momentDetails = async (id, signal) =>
    await fetchData(`/moments/${id}`, "GET", signal, undefined);
