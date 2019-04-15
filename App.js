import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import * as Constants from './js/constant';
import Display from './js/ARDisplay';

export default class ARDemo extends Component {
    render() {
        return (
            <ViroARSceneNavigator apiKey = {Constants.apiKey}
                initialScene={{ scene: Display }} />
        );
    }
}