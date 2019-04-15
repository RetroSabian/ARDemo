import { combineReducers } from 'redux';
import UIReducer from './UI/UIReducer';

const RootReducer = combineReducers({
    UIState: UIReducer
});

export default RootReducer;