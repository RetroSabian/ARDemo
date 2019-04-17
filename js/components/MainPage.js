import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { View, StyleSheet } from 'react-native';
import * as Constants from '../Constants/constant';
import Display from './ARDisplay';
import ARInitializationUI from './ARInitializationUI';
import CartList from './CartList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={localStyles.flex}>
                <ViroARSceneNavigator apiKey = {Constants.apiKey}
                    initialScene={{ scene: Display }} />
                <ARInitializationUI style={localStyles.initializationUI}/>
                {this.props.CartState.ShowCartList ?   
                    <View style={localStyles.listView}>
                        <CartList/>
                    </View> : null}  
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

MainPage.propTypes = {
    CartState: PropTypes.shape({
        ShowCartList: PropTypes.bool
    })
};

const mapStateToProps = (state) => ({
    CartState: state.CartState
});

export default connect(mapStateToProps)(MainPage);