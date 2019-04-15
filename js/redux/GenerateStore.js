import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './RootReducer';
import thunk from 'redux-thunk';
import InitialState from './InitialState';

const composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = (initialState = InitialState) => {
    return createStore(
        RootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
};

export default generateStore;