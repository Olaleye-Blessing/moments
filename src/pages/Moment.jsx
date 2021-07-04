import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
// import { BsPerson } from "react-icons/bs";
// import { BiLike, BiDislike } from "react-icons/bi";
// import { FaRegComment } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { IoShareOutline } from "react-icons/io5";

import LoadingIndicator from "../components/LoadingIndicator";
import { useMomentContext } from "../context/MomentsContext";
// import { momentDetails } from "../reducer/fetchActions";
import Avatar from "../components/Avatar";
import FormTextArea from "../components/Form/FormTextArea";
import FormButton from "./../components/Form/FormButton";
import { createComment } from "../reducer/fetchActions/comment";
import { actions } from "../reducer/actions";
import { momentDetails } from "../reducer/fetchActions/moment";

const Moment = () => {
    let history = useHistory();
    let { id } = useParams();
    let { state, dispatch } = useMomentContext();
    const [comment, setComment] = useState("");
    let { moments, user } = state;
    console.log(user);
    console.log(Boolean(user));

    const [moment, setMoment] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);

    let abortMoment = new AbortController();
    let signal = abortMoment.signal;

    const getMoment = () => moments.find((moment) => moment._id === id) || null;

    const fetchMoment = async () => {
        try {
            let response = await momentDetails(id, signal);
            setMoment(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (moments.length > 0) {
            setMoment(getMoment());
            setLoading(false);
        } else {
            fetchMoment();
        }
        setMoment(getMoment());

        return () => abortMoment.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <LoadingIndicator />;

    // console.log(moment);
    // console.log(state);
    let { image, title, creator, message, tags, comments } = moment;
    let { profilePic, name } = creator;

    tags = [...new Set([...tags])];
    message = message.split("\n");
    // console.log(message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            comment,
            moment: moment._id,
        };

        try {
            let res = await createComment(data);
            // console.log(res);
            dispatch({
                type: actions.CREATE_COMMENT,
                payload: res.data.comment,
            });
        } catch (error) {
            console.info(error);
        }
    };

    return (
        // <>
        <div className="bigFlex" data-page="moment">
            <aside>reactions</aside>
            <main>
                <article className="article box">
                    {image && (
                        <figure className="article__img-cont">
                            <img
                                src={image}
                                alt="kk"
                                className="article__img"
                            />
                        </figure>
                    )}

                    <section className="article__detail">
                        <h2 className="article__title">{title}</h2>
                        <ul className="article__tags moment__tags">
                            {tags.map((tag) => (
                                <li
                                    key={tag}
                                    className="moment__tag article__tag"
                                >
                                    <button
                                        type="button"
                                        className="btn moment__tag-link"
                                        style={{ fontSize: "16px" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            history.push(
                                                `/moments/tags/${tag}`
                                            );
                                        }}
                                    >
                                        {tag}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="moment__detail-profileDate article__detail-profileDate">
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
                                    {/* time */}
                                    {/* {humanDate(createdAt)} */}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="article__detail">
                        {message.map((message) => (
                            <p key={message} className="article__message">
                                {message}
                            </p>
                        ))}
                        {/* <p className="article__message">{message[0]}</p> */}
                    </section>

                    <section className="article__comments">
                        <h3 id="comments">Comments ({comments.length})</h3>
                        {user ? (
                            <form
                                className="article__form-comment"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <Avatar
                                        src={user.profilePic}
                                        sub_class="moment__creator-avatar"
                                    />
                                    <FormTextArea
                                        // name="comment"
                                        // rows={22}
                                        cols={50}
                                        value={comment}
                                        handleChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        placeholder="write your comment..."
                                    />
                                </div>
                                <FormButton
                                    text="comment"
                                    type="submit"
                                    classname="form__button-submit"
                                />
                            </form>
                        ) : (
                            <div>
                                <Link
                                    to="/auth/login"
                                    className="btn nav__link"
                                >
                                    login
                                </Link>{" "}
                                to comment
                            </div>
                        )}
                    </section>

                    {comments.length > 0 && (
                        <ul className="article__comments-users">
                            {comments.map((com) => {
                                let { _id, comment, user } = com;
                                return (
                                    <li key={_id} className="article__comment">
                                        <Avatar src={user.profilePic} />
                                        <div>
                                            <h6>{user.name}</h6>
                                            <p>{comment}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </article>
            </main>
            <aside>creator profile</aside>
        </div>
    );
};

export default Moment;
