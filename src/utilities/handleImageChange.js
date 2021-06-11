import imagesToBase64 from "./imageToBase64";

export const handleImageChange = async (e) => {
    let image = await imagesToBase64(e);
    image = image[0];
    return image;
};
