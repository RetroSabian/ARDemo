import * as Types from './UIActionTypes';

export const ARTrackingInitialized = (value) => (dispatch) => dispatch(ARTrackingInitializedAC(value));

const ARTrackingInitializedAC = (value) => {
    return {
        type: Types.AR_TRACKING_INITIALIZED,
        TrackerInitialized: value
    };
};