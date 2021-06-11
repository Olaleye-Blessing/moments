const Avatar = ({ src }) => {
    return (
        <figure className="avatar__img-cont">
            <img src={src} alt="user" className="avatar__img" />
        </figure>
    );
};

export default Avatar;
