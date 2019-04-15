import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import App from './App';
import generateStore from './js/redux/GenerateStore';

export default class Root extends Component {
    render() {
        return (
            <Provider store={generateStore()}>
                <App />
            </Provider>
        );
    }
}
AppRegistry.registerComponent('ARDemo', () => App);