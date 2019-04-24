import InitialState from '../InitialState';
import * as Types from './UIActionTypes';

export default (state = InitialState.UIState, action) => {
    switch (action.type) {
    case Types.AR_TRACKING_INITIALIZED:
        return {
            ...state, 
            UIState: {
                ...state.UIState,
                TrackerInitialized: action.UIState.TrackerInitialized
            }
        };
    default:
        return state;
    }
};