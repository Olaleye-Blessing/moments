import { useEffect } from "react";
import { useMomentContext } from "../context/MomentsContext";
import { actions } from "../reducer/actions";

const Alert = ({ type, msg }) => {
    let { dispatch } = useMomentContext();
    useEffect(() => {
        let timeId = setTimeout(() => {
            dispatch({ type: actions.ERROR, payload: { show: false } });
        }, 4000);

        return () => {
            dispatch({ type: actions.ERROR, payload: { show: false } });
            clearTimeout(timeId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={`alert alert-${type}`}>{msg}</div>;
};

export default Alert;
