const humanDate = (date) => {
    date = new Date(date);

    let dateString = date.toDateString();
    // let dateUtc = date.toUTCString();

    return dateString;
};

export default humanDate;
