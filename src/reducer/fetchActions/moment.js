import { fetchData } from "../fetchActions";

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

export const momentDetails = async (id, signal) =>
    await fetchData(`/moments/${id}`, "GET", signal, undefined);
