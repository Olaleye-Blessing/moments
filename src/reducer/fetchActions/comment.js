import getBaseUrl from "../../utilities/getBaseUrl";

let baseUrl = getBaseUrl();

export const createComment = async (comment) => {
    try {
        let req = await fetch(`${baseUrl}/comments`, {
            method: "POST",
            body: JSON.stringify(comment),
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
