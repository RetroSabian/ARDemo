import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { View, StyleSheet } from 'react-native';
import * as Constants from '../Constants/constant';
import Display from './ARDisplay';
import ARInitializationUI from './ARInitializationUI';
import CartList from './CartList';

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
                <View style={localStyles.listView}>
                    <CartList/>
                </View>
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
    },
    listView: {
        flex: 1,
        height: 72,
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        backgroundColor: '#000000aa'
    }
});