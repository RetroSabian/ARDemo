import React, { Component } from 'react';
import {
    ViroARScene,
    ViroConstants,
    ViroAmbientLight,
    ViroARImageMarker,
    ViroNode,
    Viro3DObject,
    ViroARTrackingTargets,
    ViroText,
    ViroMaterials,
    ViroAnimations
} from 'react-viro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UiActions from '../redux/UI/UIActions';
import Cart from '../res/Cart/cart.obj';
import * as Constants from '../Constants/constant';
import { Style } from '../Constants/styleConstants';
import PropTypes from 'prop-types';
import { ProductArray } from '../Constants/ProductConstants';

class ARDisplay extends Component {
    constructor() {
        super();
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
        alert('found');
    }

    _onTrackingUpdated(state) {
        let trackingNormal = false;
        if (state === ViroConstants.TRACKING_NORMAL) {
            trackingNormal = true;
        } 
        this.props.uiActions.ARTrackingInitialized(trackingNormal);
    }
    render() {
        
        return <ViroARScene onTrackingUpdated= {this._onTrackingUpdated}>
            <ViroAmbientLight color="#ffffff" intensity={200}/>
            {
                ProductArray.map((product, index) => <ViroARImageMarker target={product.concatName} onAnchorFound={this._onAnchorFound} key={index}> 
                    <ViroText 
                        fontSize={12}
                        style={Style.ProductName} 
                        position={[ Constants.zero, Constants.zero, Constants.negativeFive ]}
                        width={15} 
                        height={5} 
                        extrusionDepth={8}
                        materials={[ 'frontMaterial', 'backMaterial', 'sideMaterial' ]}
                        text= {product.name} 
                    />
                    <ViroNode
                        position={[ Constants.pointOne, Constants.pointOne, Constants.zero ]}>
                        <Viro3DObject
                            onClick={this.handleclick}
                            scale={[ Constants.one, Constants.one , Constants.one ]}
                            source={Cart}
                            type="OBJ"
                            animation={{ name: this.state.animationType, run: this.state.animate, loop: true, onFinish: this._onAnimationFinished }} />
                    </ViroNode>
                </ViroARImageMarker>) 
            }
        </ViroARScene>;
    }
}
 
ViroARTrackingTargets.createTargets(
    ProductArray.reduce((accObject, product) => {
        accObject[product.concatName] = {
            source: product.source,
            orientation: product.orientation,
            physicalWidth: product.physicalWidth
        };
        return accObject;
    }, {})
);

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

ViroMaterials.createMaterials({
    frontMaterial: {
        diffuseColor: '#FFFFFF',
    },
    backMaterial: {
        diffuseColor: '#FF0000',
    },
    sideMaterial: {
        diffuseColor: '#0000FF',
    },
});

const mapStateToProps = (state) => ({
    UIState: state.UIState
});

const mapActionsToProps = (dispatch) => ({
    uiActions: bindActionCreators(UiActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ARDisplay);