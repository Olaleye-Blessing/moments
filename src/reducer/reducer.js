/* eslint-disable default-case */
import { actions } from "./actions";
export const reducer = (state, action) => {
    // console.log(state);
    // console.log(action);
    // console.log(action.payload);
    switch (action.type) {
        case actions.FETCH_ALL:
            return { ...state, moments: [...action.payload] };

        case actions.CREATE_MOMENT:
            let newcreatedMoment = { ...action.payload, comments: [] };
            return { ...state, moments: [...state.moments, newcreatedMoment] };

        case actions.UPDATE_MOMENT:
            let { moments } = state;
            moments = moments.map((moment) =>
                moment._id === action.payload._id ? action.payload : moment
            );
            return { ...state, moments };

        case actions.DELETE_MOMENT:
            let { moments: currentMoments } = state;
            console.log(currentMoments);

            currentMoments = currentMoments.filter(
                (moment) => moment._id !== action.payload
            );

            console.log(currentMoments);
            return { ...state, moment: currentMoments };

        case actions.AUTHENTICATION:
            localStorage.setItem("profile", JSON.stringify(action.payload));
            return { ...state, user: action.payload };

        case actions.LOGOUT:
            localStorage.removeItem("profile");
            return { ...state, user: null };

        case actions.ERROR:
            return { ...state, errorAlert: { ...action.payload } };

        case actions.CREATE_COMMENT:
            let oldMoments = [...state.moments];
            let momentId = action.payload.moment;
            let oldMoment = oldMoments.find(
                (moment) => moment._id === momentId
            );
            oldMoment.comments = [...oldMoment.comments, action.payload];

            return { ...state, moments: oldMoments };
    }
};
