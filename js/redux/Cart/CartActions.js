import * as Types from './CartActionTypes';
import * as Constants from '../../Constants/constant';

export const ToggleCart = (flag) => dispatch => {
    dispatch(ToggleCartAC(flag));
};

export const AddToCartNew = (array, name, source, price) => (dispatch) => {
    const value = array.push({ 'name': name, 'source': source, 'price': price, 'qty': Constants.one });
    dispatch(AddToCartAC(value));
};

export const AddToCartExists = (array, name) => (dispatch) => {
    const value = array.map((product) => ({
        ...product, 
        qty: product.name === name ? ++product.qty : product.qty
    }));
    dispatch(AddToCartAC(value));
};

export const ToggleCartAC = (flag) => {
    return {
        type: Types.TOGGLE_CART_LIST,
        CartState: {
            ShowCartList: flag
        }
    };
};

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