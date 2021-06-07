export function formatDate(seconds) {
    if (seconds === 0) return "now";

    let units = []; // years, days, hours, minutes, seconds

    let secs = Math.round(seconds % 60);

    if (secs !== 0) units.unshift(`${secs}s`);

    let mins = Math.floor((seconds % 3600) / 60);

    if (mins !== 0) units.unshift(`${mins}m`);

    let hrs = Math.floor(seconds / 3600) % 24;

    if (hrs !== 0) units.unshift(`${hrs}h`);

    let days = Math.floor(seconds / (3600 * 24)) % 365;

    if (days !== 0) units.unshift(`${days}d`);

    let years = Math.floor(Math.floor(seconds / (3600 * 24)) / 365);

    if (years !== 0) units.unshift(`${years}y`);

    return units.join(" ");
}
