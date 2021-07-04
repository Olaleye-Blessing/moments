import { fetchData } from "../fetchActions";

export const signup = async (data) =>
    await fetchData(`/auth/signup`, "POST", undefined, data);

export const login = async (data) =>
    await fetchData(`/auth/login`, "POST", undefined, data);

export const logout = async () =>
    await fetchData(`/auth/logout`, "GET", undefined, undefined);
