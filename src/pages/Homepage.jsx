import { useEffect, useState } from "react";
import { useMomentContext } from "../context/MomentsContext";
import { actions } from "../reducer/actions";
// import { fetchPosts } from "../reducer/fetchActions";
// import { fetchData } from "../reducer/fetchActions";
import Moments from "../components/Moments/Moments";
import LoadingIndicator from "../components/LoadingIndicator";
// import cryingGif from "./data/gifs/crying.gif";
import { Link } from "react-router-dom";
import HomeAsideProfile from "../components/HomeAside/HomeAsideProfile";
import HomeAsideOthers from "../components/HomeAside/HomeAsideOthers";
import { fetchPosts } from "../reducer/fetchActions/moment";
// import NotFound from "./NotFound";
import Alert from "./../components/Alert";

const Homepage = () => {
    let { state, dispatch } = useMomentContext();
    // const [moments, setMoments] = useState([]);
    let { errorAlert } = state;

    const [status, setStatus] = useState(null);
    useEffect(() => {
        let abort = new AbortController();
        let signal = abort.signal;

        const fetchAllPosts = async () => {
            try {
                let response = await fetchPosts(signal);
                // let response = await fetchData(`/moments`, signal);

                if (response) {
                    let { moments, status } = response;

                    if (status === "success") {
                        setStatus("success");
                        dispatch({ type: actions.FETCH_ALL, payload: moments });
                    }
                }
            } catch (error) {
                // let message = {
                //     show: true,
                //     type: "invalid",
                //     msg: `${error.message}.`,
                // };
                dispatch({ type: actions.ERROR, payload: error });
                console.log(error);
            }
        };

        fetchAllPosts();

        return () => abort.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let { moments } = state;

    return (
        <div data-page="homepage" className="width width-one">
            {errorAlert.show && <Alert {...errorAlert} />}
            <aside>
                <HomeAsideProfile />
            </aside>
            <main data-content="moments">
                {moments.length < 1 && !status ? (
                    <LoadingIndicator />
                ) : moments.length < 1 && status ? (
                    <>
                        <div className="error-page-cont">
                            <div id="error-page">
                                <div className="content">
                                    <h2 className="header" data-text="(^_^)">
                                        (^_^)
                                    </h2>
                                    <h4
                                        style={{ marginTop: "20px" }}
                                        data-text="😔😔😔😔"
                                    >
                                        😔😔😔😔
                                    </h4>
                                    <p>Sorry! There are no moments available</p>
                                    <div className="btns">
                                        <Link to="/moment">create moment</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Moments moments={moments} />
                )}
            </main>
            <aside>
                <HomeAsideOthers />
            </aside>
        </div>
    );
};

export default Homepage;
