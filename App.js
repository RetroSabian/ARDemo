import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { View, StyleSheet } from 'react-native';
import * as Constants from './js/constant';
import Display from './js/components/ARDisplay';
import { Provider } from 'react-redux';
import generateStore from './js/redux/GenerateStore';
import ARInitializationUI from './js/components/ARInitializationUI';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Provider store={generateStore()}>
                <View style={localStyles.flex}>
                    <ViroARSceneNavigator apiKey = {Constants.apiKey}
                        initialScene={{ scene: Display }} />
                    <ARInitializationUI style={localStyles.initializationUI}/>
                </View>
            </Provider>
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