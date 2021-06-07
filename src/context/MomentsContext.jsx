import { createContext, useContext, useReducer, useState } from "react";
import { reducer } from "../reducer/reducer";

const MomentContent = createContext();

const initialState = {
    moments: [],
};

export const MomentsProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState, () => {
    //     return { moments: [] };
    // });
    const [state, dispatch] = useReducer(reducer, initialState);

    // console.log(state.moments);
    const [currentMomentId, setCurrentMomentId] = useState(null);
    return (
        <MomentContent.Provider
            value={{ state, dispatch, currentMomentId, setCurrentMomentId }}
        >
            {children}
        </MomentContent.Provider>
    );
};

export const useMomentContext = () => useContext(MomentContent);
