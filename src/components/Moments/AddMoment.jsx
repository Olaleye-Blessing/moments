import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import FormButton from "../Form/FormButton";
import FormFile from "../Form/FormFile";
import FormText from "../Form/FormText";
import FormTextArea from "../Form/FormTextArea";
// import FileBase from "react-file-base64";
import { imagesToBase64 } from "../../utilities/imageToBase64";
import { useMomentContext } from "../../context/MomentsContext";
import { createPost, updatePost, fetchData } from "../../reducer/fetchActions";
import { actions } from "../../reducer/actions";
import Alert from "../Alert";

const AddMoment = () => {
    let history = useHistory();

    let { state, dispatch, currentMomentId, setCurrentMomentId } =
        useMomentContext();
    const [momentData, setMomentData] = useState({
        // creator: "",
        title: "",
        message: "",
        tags: "",
        image: "",
    });

    let { moments } = state;
    let moment = currentMomentId
        ? moments.find((moment) => moment._id === currentMomentId)
        : null;

    useEffect(() => {
        if (moment) {
            setMomentData({ ...moment, tags: moment.tags.join(" ") });
        }
    }, [moment]);

    useEffect(() => {
        return () => {
            reset();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setMomentData({ ...momentData, [name]: value });
    };

    const handleImageChange = async (e) => {
        let image = await imagesToBase64(e);
        image = image[0];
        setMomentData({ ...momentData, image });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentMomentId) {
            let { moment } = await updatePost(currentMomentId, momentData);
            // console.log(moment);
            dispatch({ type: actions.UPDATE_MOMENT, payload: moment });
            reset();
            history.push("/");
        } else {
            try {
                console.log("using fetch data...");

                // console.log(momentData);
                // let result = await createPost(momentData);
                // console.log(result);

                let { moment } = await createPost(momentData);
                // let { moment } = await fetchData(
                //     ``,
                //     "POST",
                //     undefined,
                //     momentData
                // );
                dispatch({ type: actions.CREATE_MOMENT, payload: moment });
                reset();
                console.log("data is back...");
                history.replace("/");
            } catch (error) {
                if (error.code === 401) {
                    let message = {
                        show: true,
                        type: "invalid",
                        msg: `${error.message}. Redirecting to login page in 5 secs`,
                    };
                    dispatch({ type: actions.ERROR, payload: message });

                    setTimeout(() => {
                        history.replace("/auth/login");
                    }, 5000);
                }
            }
        }
    };

    const reset = () => {
        setCurrentMomentId(null);
        setMomentData({
            // creator: "",
            title: "",
            message: "",
            tags: "",
            image: "",
        });
    };

    // console.log({ ...state });
    let { errorAlert } = state;
    // console.log(errorAlert);

    // console.log(currentMomentId);
    return (
        <main className="form__main">
            {errorAlert.show && <Alert {...errorAlert} />}
            <form className="form" onSubmit={handleSubmit}>
                {currentMomentId ? (
                    <Link
                        to="/"
                        className="btn btn-white btn__link form__home-back"
                    >
                        back to moments
                    </Link>
                ) : null}
                <h2 className="form__head">
                    {moment ? "Update" : "Create"} Your Moment
                </h2>
                {/* <FormText
                    name="creator"
                    value={momentData.creator}
                    handleChange={handleChange}
                /> */}
                <FormText
                    name="title"
                    value={momentData.title}
                    handleChange={handleChange}
                />
                <FormTextArea
                    name="message"
                    value={momentData.message}
                    handleChange={handleChange}
                />
                <FormText
                    name="tags"
                    value={momentData.tags}
                    handleChange={handleChange}
                    // placeholder="-- seperate tags with comma(,)"
                    placeholder="tag1 tag2 tag3..."
                />
                <FormFile name="image" handleChange={handleImageChange} />
                <FormButton
                    text="publish"
                    type="submit"
                    classname="form__button-submit"
                />
                <FormButton
                    text="reset"
                    type="reset"
                    classname="form__button-reset"
                    handleClick={reset}
                />
            </form>
        </main>
    );
};

export default AddMoment;
