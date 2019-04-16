import * as Types from './CartActionTypes';

export const AddToCart = (value) => (dispatch) => dispatch(AddToCartAC(value));

export const AddToCartAC = (value) => {
    return {
        type: Types.ADD_TO_CART,
        CartState: {
            InCart: value
        }
    };
};

export const RemoveFromCart = (value) => (dispatch) => dispatch(RemoveFromCartAC(value));

export const RemoveFromCartAC = (value) => {
    return {
        type: Types.REMOVE_FROM_CART,
        CartState: {
            InCart: value
        }
    };
};