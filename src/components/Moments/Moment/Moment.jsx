import { useHistory } from "react-router-dom";
// import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { BsBookmark } from "react-icons/bs";
// import { BiVideo } from "react-icons/bi";
import { VscEdit, VscReactions } from "react-icons/vsc";

import { useMomentContext } from "../../../context/MomentsContext";
import humanDate from "../../../utilities/humanDate";
import defaultImage from "./../../../data/images/blueFlower.jpg";
import Avatar from "../../Avatar";
// import { deletePost } from "../../../reducer/fetchActions";
import { deletePost } from "../../../reducer/fetchActions/moment";
import { actions } from "../../../reducer/actions";

const Moment = ({ moment }) => {
    // console.log(moment);
    let { setCurrentMomentId, state, dispatch } = useMomentContext();
    // let { state } = useMomentContext();
    let history = useHistory();

    let { user } = state;
    let {
        creator,
        createdAt,
        // image,
        title,
        _id,
        tags,
        message,
        likes,
        dislikes,
        comments,
    } = moment;
    // console.log(moment);
    let { profilePic, name } = creator;

    profilePic = profilePic || defaultImage;

    tags = [...new Set([...tags])]; //? eliminate duplicate tags

    // let secondsAgo = Date.now() - new Date(createdAt).getTime();

    // let formattedTime = formatDate(secondsAgo / 1000);

    // console.log(humanDate(createdAt));

    // image = !image ? defaultImage : image;

    const showMomentDetail = (e) => {
        e.stopPropagation();
        history.push(`/moments/${_id}`);
    };

    // console.log(moment);
    // console.log(likes, dislikes);

    let reactions = Number(likes) + Number(dislikes);

    // console.log(creator);

    const deleteMoment = async (e) => {
        e.stopPropagation();
        console.log("delete clicked");
        dispatch({
            type: actions.DELETE_MOMENT,
            payload: moment._id,
        });
        try {
            await deletePost(moment._id);
        } catch (error) {
            console.log(error);
        }
        // history.replace("/");
    };
    return (
        <article className="moment box" tabIndex={0} onClick={showMomentDetail}>
            {/* {image ? (
                <figure className="moment__figure">
                    <img src={image} alt="" className="moment__figure-img" />
                </figure>
            ) : null} */}
            <section className="moment__detail">
                <div className="moment__detail-profileDate">
                    <Avatar
                        src={profilePic}
                        sub_class="moment__creator-avatar"
                    />
                    <div>
                        <button
                            type="button"
                            className="btn moment__creator-name"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("clicked....");
                                history.push(`/profile/${creator._id}`);
                            }}
                        >
                            {name}
                        </button>
                        <p className="moment__createdAt">
                            {humanDate(createdAt)}
                        </p>
                    </div>
                </div>
                <div className="moment__detail-other">
                    <h3 className="moment__title">{title}</h3>
                    <p className="moment__message">{message}</p>
                    <ul className="moment__tags">
                        {tags.map((tag) => (
                            <li key={tag} className="moment__tag">
                                <button
                                    type="button"
                                    className="btn moment__tag-link"
                                    style={{ fontSize: "16px" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        history.push(`/moments/tags/${tag}`);
                                    }}
                                >
                                    {tag}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <ul className="moment__reactions">
                            <li>
                                <VscReactions />
                                <span>
                                    {reactions} reaction
                                    {reactions > 0 ? "s" : null}
                                </span>
                            </li>
                            <li>
                                <button
                                    className="btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        history.push(
                                            `/moments/${_id}/#comments`
                                        );
                                    }}
                                >
                                    <FaRegComment />
                                    <span>
                                        {comments.length}{" "}
                                        {comments.length > 1
                                            ? "comments"
                                            : "comment"}
                                    </span>
                                </button>
                                {/* <FaRegComment />
                                <span>
                                    {comments.length}{" "}
                                    {comments.length > 1
                                        ? "comments"
                                        : "comment"}
                                </span> */}
                            </li>
                        </ul>
                        <ul className="moment__actions">
                            {user?._id === creator._id ? (
                                <li>
                                    <button
                                        className="btn"
                                        onClick={deleteMoment}
                                    >
                                        <MdDelete className="moment__delete" />
                                    </button>
                                </li>
                            ) : null}
                            {user?._id === creator._id && (
                                <li>
                                    <button
                                        className="btn"
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            setCurrentMomentId(moment._id);
                                            history.replace("/moment");
                                        }}
                                    >
                                        <VscEdit className="moment__edit" />
                                    </button>
                                </li>
                            )}
                            {/* <li>
                                <button className="btn">
                                    <BsBookmark className="moment__bookmark" />
                                </button>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default Moment;
