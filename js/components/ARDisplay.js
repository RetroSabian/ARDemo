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
    ViroVideo,
    ViroAnimations
} from 'react-viro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UiActions from '../redux/UI/UIActions';
import * as CartActions from '../redux/Cart/CartActions';
import Cart from '../res/Cart/cart.obj';
import Rating from '../res/Cart/Star.obj';
import RatingColor from '../res/Cart/object_star_specular.png';
import * as Constants from '../Constants/constant';
import { Style } from '../Constants/styleConstants';
import PropTypes from 'prop-types';
import { ProductArray } from '../Constants/ProductConstants';
import CatelogDisplay from './CatelogScanner';

class ARDisplay extends Component {
    constructor() {
        super();
        this.state = {
            text: 'Initializing AR...',
            animate: false,
            animationType: 'spawn'
        };
        this._onAnchorFound = this._onAnchorFound.bind(this);
        this._onAnimationFinished = this._onAnimationFinished.bind(this);
        this.handleclick = this.handleclick.bind(this);
        this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
        this._rating = this._rating.bind(this);
    }

    _onAnimationFinished(){
        this.setState({
            animationType: 'rotation',
        });
    }

    handleclick(name, source, price){
        if (this.props.CartState.InCart.find(product => product.name === name)) {
            this.props.cartActions.AddToCartExists(this.props.CartState.InCart, name);
        } else {
            this.props.cartActions.AddToCartNew(this.props.CartState.InCart, name, source, price);
        }
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
    _rating(rating) {
        let myloop = [];     
        for (let i = 0; i < rating; i++) {
            let val = 1;
            val = val + i;
            myloop.push(
                <Viro3DObject key={i}
                    position={[ Constants.one + val, Constants.zero, Constants.negativeFive ]}
                    rotation={[ Constants.negativeNinety, Constants.zero, Constants.zero ]}
                    scale={[ Constants.one, Constants.zero, Constants.one ]}
                    source={Rating}
                    resources={ [ RatingColor ]}
                    type="OBJ"
                    animation={{ name: this.state.animationType, run: this.state.animate, loop: true, onFinish: this._onAnimationFinished }}
                    
                />
            );
        }
        return (
            <ViroNode>
                { myloop }
            </ViroNode>
            
        );
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
                    <ViroText 
                        fontSize={12}
                        style={Style.ProductName} 
                        position={[ Constants.one, Constants.zero, Constants.negativeFive ]}
                        width={15} 
                        height={5} 
                        extrusionDepth={8}
                        materials={[ 'frontMaterial', 'backMaterial', 'sideMaterial' ]}
                        text={'R' + product.price.toLocaleString()} 
                    />
                    {this._rating(product.rating)}
                    <ViroVideo
                        source={require('../res/Videos/hands.mp4')}
                        height={2}
                        width={2}
                        border={2}
                        loop={true}
                        position={[ -2,Constants.zero,-5]}
                    /> 
                    <ViroNode
                        position={[ Constants.pointOne, Constants.pointOne, Constants.zero ]}>
                        <Viro3DObject
                            onClick={() => this.handleclick(product.name, product.source,product.price)}
                            scale={[ Constants.one, Constants.one , Constants.one ]}
                            source={Cart}
                            type="OBJ"
                            animation={{ name: this.state.animationType, run: this.state.animate, loop: true, onFinish: this._onAnimationFinished }} />
                    </ViroNode>
                </ViroARImageMarker>) 
            }
            <CatelogDisplay/>
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
    }),
    cartActions: PropTypes.shape({
        AddToCartNew: PropTypes.func,
        AddToCartExists: PropTypes.func
    }),
    CartState: PropTypes.shape({
        InCart: PropTypes.array
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
    UIState: state.UIState,
    CartState: state.CartState
});

const mapActionsToProps = (dispatch) => ({
    uiActions: bindActionCreators(UiActions, dispatch),
    cartActions: bindActionCreators(CartActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ARDisplay);