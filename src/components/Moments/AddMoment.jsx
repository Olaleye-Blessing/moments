import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import FormButton from "../Form/FormButton";
import FormFile from "../Form/FormFile";
import FormText from "../Form/FormText";
import FormTextArea from "../Form/FormTextArea";
import { imagesToBase64 } from "../../utilities/imageToBase64";
import { useMomentContext } from "../../context/MomentsContext";
import { actions } from "../../reducer/actions";
import Alert from "../Alert";
import { createPost, updatePost } from "../../reducer/fetchActions/moment";

const AddMoment = () => {
    let history = useHistory();

    let { state, dispatch, currentMomentId, setCurrentMomentId } =
        useMomentContext();
    const [momentData, setMomentData] = useState({
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
            dispatch({ type: actions.UPDATE_MOMENT, payload: moment });
            reset();
            history.push("/");
        } else {
            try {
                let { moment } = await createPost(momentData);
                dispatch({ type: actions.CREATE_MOMENT, payload: moment });
                reset();
                history.replace("/");
            } catch (error) {
                if (error.code === 401) {
                    dispatch({ type: actions.ERROR, payload: error });

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
            title: "",
            message: "",
            tags: "",
            image: "",
        });
    };

    let { errorAlert } = state;

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
