import { useEffect, useState } from "react";
import { useMomentContext } from "./context/MomentsContext";
import { actions } from "./reducer/actions";
import { fetchPosts } from "./reducer/fetchActions";
import Moments from "./components/Moments/Moments";
import LoadingIndicator from "./components/LoadingIndicator";
import cryingGif from "./data/gifs/crying.gif";
import { Link } from "react-router-dom";

const Homepage = () => {
    let { state, dispatch } = useMomentContext();
    // const [moments, setMoments] = useState([]);

    const [status, setStatus] = useState(null);
    useEffect(() => {
        let abort = new AbortController();
        let signal = abort.signal;

        const fetchAllPosts = async () => {
            try {
                let { moments, status } = await fetchPosts(signal);
                // console.log(status);
                if (status === "success") setStatus("success");
                // console.log(moments);
                // dispatch({ type: "FETCH_ALL", payload: posts });
                dispatch({ type: actions.FETCH_ALL, payload: moments });
                // setMoments(moments);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllPosts();

        return () => abort.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let { moments } = state;

    // return moments.length < 1 ? (
    //     <div>loading</div>
    // ) : (
    //     <main>
    //         <Moments moments={moments} />
    //     </main>
    // );
    return moments.length < 1 && !status ? (
        // <div>loading</div>
        <LoadingIndicator />
    ) : moments.length < 1 && status ? (
        <>
            <div className="moments__empty">(^_^)b</div>
            <div className="moments__empty-link">
                no moments available. <Link to="/moment">create</Link> for
                yourself and others
            </div>
        </>
    ) : (
        <main>
            <Moments moments={moments} />
        </main>
    );
};

export default Homepage;
