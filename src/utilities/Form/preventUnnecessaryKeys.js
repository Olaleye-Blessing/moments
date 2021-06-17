export const preventUnnecessaryKeys = (e) => {
    // eslint-disable-next-line default-case
    switch (e.key) {
        case "CapsLock":
        case "Shift":
        case "Control":
        case "Alt":
        case "OS":
        case "PageDown":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
        case "ArrowUp":
            // case "":
            // case "":
            return;
    }
    return true;
};
