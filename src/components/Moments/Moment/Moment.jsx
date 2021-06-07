import { Link, useHistory } from "react-router-dom";
import { FcLike, FcDislike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";

import mjImg from "./../../../data/images/mj2.jpg";
// import { createRef } from "react";
import { useMomentContext } from "../../../context/MomentsContext";
import { formatDate } from "./../../../utilities/formatDate";
import { deletePost } from "../../../reducer/fetchActions";
import { actions } from "../../../reducer/actions";
import humanDate from "../../../utilities/humanDate";
import defaultImage from "./../../../data/images/blueFlower.jpg";

const Moment = ({ moment }) => {
    let { setCurrentMomentId, dispatch } = useMomentContext();
    let history = useHistory();

    let { creator, createdAt, message, dislikes, likes, image, title, tags } =
        moment;

    let secondsAgo = Date.now() - new Date(createdAt).getTime();

    let formattedTime = formatDate(secondsAgo / 1000);

    image = !image ? defaultImage : image;

    return (
        <article className="moment">
            <div className="moment__figures">
                <figure className="moment__figure">
                    <img
                        src={image}
                        alt={title}
                        className="moment__figure-img"
                    />
                </figure>
                <div className="overlay">
                    <button
                        className="btn moment__edit"
                        onClick={() => {
                            setCurrentMomentId(moment._id);
                            history.replace("/moment");
                        }}
                    >
                        <HiDotsHorizontal />
                    </button>
                </div>
            </div>
            <section className="moment__details">
                <div className="moment__detail">
                    <div className="avatar moment__avatar">
                        <figure className="avatar__img-cont">
                            <img
                                src={mjImg}
                                alt="user"
                                className="avatar__img"
                            />
                        </figure>
                        <h4 className="avatar__name moment__name">{creator}</h4>
                    </div>
                    <p className="moment__seconds">{formattedTime}</p>
                </div>
                <h3 className="moment__title">{title}</h3>
                {message.length > 190 ? (
                    <p className="moment__message">
                        {message.slice(0, 190)} ...
                        <Link to="/">read more</Link>{" "}
                    </p>
                ) : (
                    <p className="moment__message">{message}</p>
                )}
                <div className="moment__tags">
                    {tags[0]
                        ? tags.map((tag, i) => (
                              <span key={i}>{`#${tag} `}</span>
                          ))
                        : null}
                </div>
                <p className="moment__date">{humanDate(createdAt)}</p>
                <div className="moment__reactions">
                    <button className="moment__reactions-icons btn">
                        <FcLike className="moment__reactions-icon reactions-like" />
                        <span className="moment__reaction-text">{likes}</span>
                    </button>
                    <button className="moment__reactions-icons btn">
                        <FcDislike className="moment__reactions-icon reactions-dislike" />
                        <span className="moment__reaction-text">
                            {dislikes || 0}
                        </span>
                    </button>
                    <button className="moment__reactions-icons btn">
                        <FaRegComment className="moment__reactions-icon reactions-comment" />
                        <span className="moment__reaction-text">2</span>
                    </button>
                    <button
                        className="moment__reactions-icons btn"
                        onClick={async () => {
                            dispatch({
                                type: actions.DELETE_MOMENT,
                                payload: moment._id,
                            });
                            await deletePost(moment._id);
                            history.go(0);
                        }}
                    >
                        <MdDelete className="moment__reactions-icon reactions-delete" />
                    </button>
                </div>
            </section>
        </article>
    );
};

export default Moment;
