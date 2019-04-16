import React, { Component } from 'react';
import { Provider } from 'react-redux';
import generateStore from './js/redux/GenerateStore';
import MainPage from './js/components/MainPage';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Provider store={generateStore()}>
                <MainPage/>
            </Provider>
        );
    }
}