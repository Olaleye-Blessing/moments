const Avatar = ({ src, sub_class }) => {
    return (
        <figure className={`avatar__img-cont ${sub_class}`}>
            <img src={src} alt="user" className="avatar__img" />
        </figure>
    );
};

Avatar.defaultProps = {
    sub_class: "",
};

export default Avatar;
