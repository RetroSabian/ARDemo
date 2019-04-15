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
import RomanyMarker from './res/Markers/Romany.jpg';
import Cart from './res/Cart/cart.obj';
import * as Constants from './constant';

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
                </ViroNode>
            </ViroARImageMarker>
        </ViroARScene>
        ;
    }

    _onInitialized(state) {
        if (state === ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: ''
            });
        } else if (state === ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
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

export default ARDisplay;