import { createContext, useContext, useReducer, useState } from "react";
import { reducer } from "../reducer/reducer";

const MomentContent = createContext();

const initialState = {
    moments: [],
    // user: null,
    user: JSON.parse(localStorage.getItem("profile")),
    errorAlert: {
        show: false,
        type: "",
        msg: "",
    },
};

export const MomentsProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState, () => {
    //     return { moments: [] };
    // });
    const [state, dispatch] = useReducer(reducer, initialState);

    // console.log(state.moments);
    const [currentMomentId, setCurrentMomentId] = useState(null);

    // let momentBaseUrl =
    //     process.env.NODE_ENV === "development"
    //         ? "http://localhost:7000"
    //         : "https://wahala-movie.herokuapp.com";
    return (
        <MomentContent.Provider
            value={{
                state,
                dispatch,
                currentMomentId,
                setCurrentMomentId,
                // momentBaseUrl,
            }}
        >
            {children}
        </MomentContent.Provider>
    );
};

export const useMomentContext = () => useContext(MomentContent);
