import React, { Component } from 'react';
import {
    ViroARScene,
    ViroConstants,
    ViroAmbientLight,
    ViroARImageMarker,
    ViroNode,
    Viro3DObject,
    ViroARTrackingTargets,
    ViroAnimations
} from 'react-viro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UIActions from '../redux/UI/UIActions';
import RomanyMarker from '../res/Markers/Romany.jpg';
import Cart from '../res/Cart/cart.obj';
import * as Constants from '../constant';
import PropTypes from 'prop-types';

class ARDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Initializing AR...',
            playAnim: false,
            animate: false,
            animationType: 'spawn'
        };
        this._onAnchorFound = this._onAnchorFound.bind(this);
        this._onAnimationFinished = this._onAnimationFinished.bind(this);
        this.handleclick = this.handleclick.bind(this);
        this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
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

    _onTrackingUpdated(state, reason) {
        let trackingNormal = false;
        if (state == ViroConstants.TRACKING_NORMAL) {
            trackingNormal = true;
        } 
        alert(trackingNormal + " SPLIT "+this.props.UIState.TrackerInitialized);
        this.props.uiActions.ARTrackingInitialized(trackingNormal);
    }

    render() {
        return <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
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
                </ViroNode>
            </ViroARImageMarker>
        </ViroARScene>
        ;
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
        ARTrackingInitialized: PropTypes.func
    })
};

const mapStateToProps = (state) => ({
    UIState: state.UIState
});

const mapActionsToProps = (dispatch) => ({
    uiActions: bindActionCreators(UIActions, dispatch)
});

export default connect( mapStateToProps, mapActionsToProps )(ARDisplay);