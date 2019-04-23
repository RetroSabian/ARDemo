import * as Types from './UIActionTypes';

export const ARTrackingInitialized = (flag) => (dispatch) => {
    //console here shows flag changes, dispatch doesnt change state
    dispatch(ARTrackingInitializedAC(flag));
};

export const ARTrackingInitializedAC = (flag) => {
    return {
        type: Types.AR_TRACKING_INITIALIZED,
        UIState: {
            TrackerInitialized: flag
        }
    };
};