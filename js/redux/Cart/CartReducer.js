import InitialState from '../InitialState';
import * as Types from './CartActionTypes';

export default (state = InitialState.CartState, action) => {
    switch (action.type) {
    case Types.ADD_TO_CART:
    case Types.REMOVE_FROM_CART:
        return {
            ...state,
            CartState: {
                ...state.CartState,
                inCart: action.inCart
            }
        };
    default:
        return state;
    }
};