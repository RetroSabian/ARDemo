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
                InCart: action.CartState.InCart
            }
        };
    case Types.TOGGLE_CART_LIST:
        return {
            ...state,
            CartState: {
                ...state.CartState,
                ShowCartList: action.CartState
            }
        };
    default:
        return state;
    }
};