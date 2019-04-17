import * as Types from './CartActionTypes';
import * as Constants from '../../Constants/constant';

export const AddToCartNew = (array, name, price) => (dispatch) => {
    const value = array.push({ 'name': name, 'price': price, 'qty': Constants.one });
    dispatch(AddToCartAC(value));
};

export const AddToCartExists = (array, name) => (dispatch) => {
    const value = array.map((product) => ({
        ...product, 
        qty: product.name === name ? ++product.qty : product.qty
    }));
    dispatch(AddToCartAC(value));
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