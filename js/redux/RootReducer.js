import { combineReducers } from 'redux';
import UIReducer from './UI/UIReducer';
import CartReducer from './Cart/CartReducer';

const RootReducer = combineReducers({
    UIState: UIReducer,
    CartState: CartReducer
});

export default RootReducer;