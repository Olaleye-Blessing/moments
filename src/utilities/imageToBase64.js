const imageToBase64 = (file) =>
    new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = function () {
            resolve(reader.result);
        };
    });

export const imagesToBase64 = (e) => {
    let files = e.target.files;
    let allFiles = [];

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        allFiles.push(imageToBase64(file));
    }

    return Promise.all(allFiles);
};
