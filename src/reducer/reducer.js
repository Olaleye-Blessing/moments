/* eslint-disable default-case */
import { actions } from "./actions";
export const reducer = (state, action) => {
    switch (action.type) {
        case actions.FETCH_ALL:
            return { ...state, moments: [...action.payload] };

        case actions.CREATE_MOMENT:
            return { ...state, moments: [...state.moments, action.payload] };

        case actions.UPDATE_MOMENT:
            let { moments } = state;
            moments = moments.map((moment) =>
                moment._id === action.payload._id ? action.payload : moment
            );
            return { ...state, moments };

        case actions.DELETE_MOMENT:
            let { moments: currentMoments } = state;

            currentMoments = currentMoments.filter(
                (moment) => moment._id !== action.payload
            );

            return { ...state, moment: currentMoments };
    }
};
