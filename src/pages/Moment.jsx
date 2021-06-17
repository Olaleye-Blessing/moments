import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";

import LoadingIndicator from "../components/LoadingIndicator";
import { useMomentContext } from "../context/MomentsContext";
import { momentDetails } from "../reducer/fetchActions";
import Avatar from "../components/Avatar";
import FormTextArea from "../components/Form/FormTextArea";
import FormButton from "./../components/Form/FormButton";

const Moment = () => {
    let { id } = useParams();
    let { state } = useMomentContext();
    let { moments, user } = state;
    // console.log(user);

    const [moment, setMoment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
    let { image, creator, message, tags } = moment;

    tags = [...new Set([...tags])];
    return (
        // <>
        <div className="bigFlex" data-page="moment">
            <aside>reactions</aside>
            <main>
                <article>moment</article>
            </main>
            <aside>creator profile</aside>
        </div>
        // </>
        // <main data-page="article">
        //     <article className="article">
        //         {image && (
        //             <figure className="article__img">
        //                 <img src={image} alt="kiii" />
        //             </figure>
        //         )}
        //         <div className="article__detail-creation">
        //             <div>
        //                 {creator.profilePic ? (
        //                     <Avatar src={creator.profilePic} />
        //                 ) : (
        //                     <figure className="avatar__icon">
        //                         <BsPerson />
        //                     </figure>
        //                 )}
        //                 <Link
        //                     to={`/profile/${creator._id}`}
        //                     className="btn btn__link"
        //                 >
        //                     {creator.name}
        //                 </Link>
        //             </div>
        //             <div className="article__createdAt">
        //                 2years 3months 4days
        //             </div>
        //         </div>
        //         <p className="article__message">{message}</p>
        //         <div className="article__actions">
        //             <div>
        //                 <div className="like">
        //                     <BiLike />
        //                     <span>3</span>
        //                 </div>
        //                 <div className="dislike">
        //                     <BiDislike />
        //                     <span>3</span>
        //                 </div>
        //                 <div className="comment">
        //                     <FaRegComment />
        //                     <span>3</span>
        //                 </div>
        //             </div>
        //             <div>
        //                 <div className="share">
        //                     <IoShareOutline />
        //                 </div>
        //                 <div className="delete">
        //                     <MdDelete />
        //                 </div>
        //             </div>
        //         </div>
        //         <ul className="article__tags">
        //             {tags.map((tag) => (
        //                 <li className="article__tag" key={tag}>
        //                     <Link to={"/"} className="btn btn__link">
        //                         {tag}
        //                     </Link>
        //                 </li>
        //             ))}
        //         </ul>
        //         {user && user._id && (
        //             <form className="article__comment-form">
        //                 <FormTextArea name="comment" placeholder="comment..." />
        //                 <FormButton
        //                     classname="form__button-submit"
        //                     text="comment"
        //                     type="submit"
        //                 />
        //             </form>
        //         )}
        //     </article>
        // </main>
    );
};

export default Moment;
