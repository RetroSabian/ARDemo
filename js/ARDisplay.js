import React, { Component } from 'react';
import {
    ViroARScene,
    ViroConstants,
    ViroAmbientLight,
    ViroARImageMarker,
    ViroNode,
    Viro3DObject,
    ViroVideo,
    ViroARTrackingTargets,
    ViroAnimations
} from 'react-viro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UiActions from './redux/UI/UIActions';
import RomanyMarker from './res/Markers/Romany.jpg';
import Cart from './res/Cart/cart.obj';
import * as Constants from './constant';
import PropTypes from 'prop-types';

class ARDisplay extends Component {
    constructor() {
        super();
        this.state = {
            text: 'Initializing AR...',
            playAnim: false,
            animate: false,
            animationType: 'spawn'
        };
        this._onInitialized = this._onInitialized.bind(this);
        this._onAnchorFound = this._onAnchorFound.bind(this);
        this._onAnimationFinished = this._onAnimationFinished.bind(this);
        this.handleclick = this.handleclick.bind(this);
    }

    _onAnimationFinished(){
        this.setState({
            animationType: 'rotation',
        });
    }

    handleclick(){
        alert('On Click Event');  
    }

    _onAnchorFound() {
        this.setState({
            animate: true,
        });
    }

    render() {
        return <ViroARScene>
            <ViroAmbientLight color="#ffffff" intensity={200}/>
            <ViroARImageMarker target={'romany'} onAnchorFound={this._onAnchorFound}> 
                <ViroNode
                    position={[ Constants.pointOne, Constants.pointOne, Constants.zero ]}>
                    <Viro3DObject
                        onClick={this.handleclick}
                        scale={[ Constants.one, Constants.one , Constants.one ]}
                        source={Cart}
                        type="OBJ"
                        animation={{ name: this.state.animationType, run: this.state.animate, loop: true, onFinish: this._onAnimationFinished }} />
                    <ViroVideo
                        source={require('./res/Videos/hands.mp4')}
                        height={2}
                        width={2}
                        border={2}
                        loop={true}
                        position={[Constants.zero,Constants.zero,-5]}
                    />
                </ViroNode>
            </ViroARImageMarker>
        </ViroARScene>
        ;
    }

    _onTrackingUpdated(state) {
        let trackingNormal = false;
        if (state === ViroConstants.TRACKING_NORMAL) {
            trackingNormal = true;
        } 
        this.props.uiActions.dispatchARTrackingInitialized(trackingNormal);
    }
}
 
ViroARTrackingTargets.createTargets({
    romany: {
        source: RomanyMarker,
        orientation: 'Up',
        physicalWidth: 0.165 // real world width in meters
    }
});

ViroAnimations.registerAnimations({
    spawn: { properties: { scaleX: Constants.pointOne, scaleY: Constants.pointOne, scaleZ: Constants.pointOne, },
        duration: 500, easing: 'bounce' },
    rotation: { properties: { rotateY: '+=45' },
        duration: 500 }
});

ARDisplay.propTypes = {
    uiActions: PropTypes.shape({
        dispatchARTrackingInitialized: PropTypes.func
    })
};

const mapStateToProps = (state) => ({
    UIState: state.UIState
});

const mapActionsToProps = (dispatch) => ({
    uiActions: bindActionCreators(UiActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ARDisplay);