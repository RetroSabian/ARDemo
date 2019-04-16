import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { View, StyleSheet } from 'react-native';
import * as Constants from '../constant';
import Display from './ARDisplay';
import ARInitializationUI from './ARInitializationUI';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={localStyles.flex}>
                <ViroARSceneNavigator apiKey = {Constants.apiKey}
                    initialScene={{ scene: Display }} />
                <ARInitializationUI style={localStyles.initializationUI}/>
            </View>
        );
    }
}
const localStyles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    initializationUI: {
        position: 'absolute', 
        top: 20, 
        left: 0, 
        right: 0, 
        width: '100%', 
        height: 140, 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
});