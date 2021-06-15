import { Link, useHistory } from "react-router-dom";
// import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
// import { BiVideo } from "react-icons/bi";
import { VscEdit, VscReactions } from "react-icons/vsc";

import { useMomentContext } from "../../../context/MomentsContext";
import humanDate from "../../../utilities/humanDate";
import defaultImage from "./../../../data/images/blueFlower.jpg";
import Avatar from "../../Avatar";

const Moment = ({ moment }) => {
    // let { setCurrentMomentId, state } = useMomentContext();
    let { state } = useMomentContext();
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

    console.log(user, creator);
    return (
        <article className="moment" tabIndex={0} onClick={showMomentDetail}>
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
                        <Link to="/home" className="moment__creator-name">
                            {name}
                        </Link>
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
                                <Link
                                    to={`/home`}
                                    className="btn moment__tag-link"
                                >
                                    {tag}
                                </Link>
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
                                <FaRegComment />
                                <span>22 comments</span>
                            </li>
                        </ul>
                        <ul className="moment__actions">
                            {user?._id === creator._id ? (
                                <li>
                                    <MdDelete className="moment__delete" />
                                </li>
                            ) : null}
                            {user?._id === creator._id && (
                                <li>
                                    <VscEdit className="moment__edit" />
                                </li>
                            )}
                            <li>
                                <BsBookmark className="moment__bookmark" />
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </article>
        // <article
        //     className="moment"
        //     tabIndex={0}
        //     onClick={showMomentDetail}
        //     onKeyDown={(e) => {
        //         if (e.code === "Space" || e.code === "Enter")
        //             showMomentDetail(e);
        //     }}
        // >
        //     <div className="moment__figure-cont">
        //         <figure className="moment__figure">
        //             <img src={image} alt="" className="moment__figure-img" />
        //         </figure>
        //         <div className="overlay moment__overlay">
        //             <div className="moment__media">
        //                 <div className="moment__type">
        //                     <BiVideo />
        //                 </div>
        //                 <div className="moment__date">
        //                     {humanDate(createdAt)}
        //                 </div>
        //             </div>
        //             <h3 className="moment__title" title={title}>
        //                 {title}
        //             </h3>
        //             <div className="moment__detail">
        //                 <div>
        //                     <button className="btn moment__bookmark">
        //                         <BsBookmark />
        //                     </button>
        //                     {user?._id === creator._id && (
        //                         <button
        //                             className="btn moment__edit"
        //                             onClick={(e) => {
        //                                 e.stopPropagation();
        //                                 // e.preventDefault();

        //                                 setCurrentMomentId(moment._id);
        //                                 history.replace("/moment");
        //                             }}
        //                         >
        //                             <VscEdit />
        //                         </button>
        //                     )}
        //                 </div>
        //                 <h5 className="moment__creator">{creator.name}</h5>
        //             </div>
        //         </div>
        //     </div>
        // </article>

        // <article className="moment">
        //     <div className="moment__figures">
        //         <figure className="moment__figure">
        //             <img
        //                 src={image}
        //                 alt={title}
        //                 className="moment__figure-img"
        //             />
        //         </figure>
        //         <div className="overlay">
        //             <button
        //                 className="btn moment__edit"
        //                 onClick={() => {
        //                     setCurrentMomentId(moment._id);
        //                     history.replace("/moment");
        //                 }}
        //             >
        //                 <HiDotsHorizontal />
        //             </button>
        //         </div>
        //     </div>
        //     <section className="moment__details">
        //         <div className="moment__detail">
        //             <div className="avatar moment__avatar">
        //                 <Avatar src={mjImg} />
        //                 <h4 className="avatar__name moment__name">{creator}</h4>
        //             </div>
        //             <p className="moment__seconds">{formattedTime}</p>
        //         </div>
        //         <h3 className="moment__title">{title}</h3>
        //         {message.length > 190 ? (
        //             <p className="moment__message">
        //                 {message.slice(0, 190)} ...
        //                 <Link to="/">read more</Link>{" "}
        //             </p>
        //         ) : (
        //             <p className="moment__message">{message}</p>
        //         )}
        //         <div className="moment__tags">
        //             {tags[0]
        //                 ? tags.map((tag, i) => (
        //                       <span key={i}>{`#${tag} `}</span>
        //                   ))
        //                 : null}
        //         </div>
        //         <p className="moment__date">{humanDate(createdAt)}</p>
        //         <div className="moment__reactions">
        //             <button className="moment__reactions-icons btn">
        //                 <FcLike className="moment__reactions-icon reactions-like" />
        //                 <span className="moment__reaction-text">{likes}</span>
        //             </button>
        //             <button className="moment__reactions-icons btn">
        //                 <FcDislike className="moment__reactions-icon reactions-dislike" />
        //                 <span className="moment__reaction-text">
        //                     {dislikes || 0}
        //                 </span>
        //             </button>
        //             <button className="moment__reactions-icons btn">
        //                 <FaRegComment className="moment__reactions-icon reactions-comment" />
        //                 <span className="moment__reaction-text">2</span>
        //             </button>
        //             <button
        //                 className="moment__reactions-icons btn"
        //                 onClick={async () => {
        //                     dispatch({
        //                         type: actions.DELETE_MOMENT,
        //                         payload: moment._id,
        //                     });
        //                     await deletePost(moment._id);
        //                     history.go(0);
        //                 }}
        //             >
        //                 <MdDelete className="moment__reactions-icon reactions-delete" />
        //             </button>
        //         </div>
        //     </section>
        // </article>
    );
};

export default Moment;
