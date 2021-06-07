import getBaseUrl from "./../utilities/getBaseUrl";

export const fetchPosts = async (signal) => {
    try {
        let req = await fetch(`${getBaseUrl()}/moments`, { signal });
        let res = await req.json();
        if (!(req.status >= 200 && req.status <= 299)) throw res;
        return res;
    } catch (error) {
        // console.error(error);
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
        });
        let res = await req.json();
        if (!(req.status >= 200 && req.status <= 299)) throw res;
        return res;
    } catch (error) {
        console.log(error);
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
