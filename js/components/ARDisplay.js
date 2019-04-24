import React, { Component } from 'react';
import {
    ViroARScene,
    ViroConstants,
    ViroAmbientLight,
    ViroARImageMarker,
    ViroNode,
    Viro3DObject,
    ViroFlexView,
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
import * as Constants from '../Constants/constant';
import { Style } from '../Constants/styleConstants';
import PropTypes from 'prop-types';
import { ProductArray } from '../Constants/ProductConstants';
import CatelogDisplay from './CatelogScanner';
import constants from 'jest-haste-map/build/constants';

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
            val = val + i * 0.5;
            moveBack = rating * 0.25 - 0.25; 
            myloop.push(
                <Viro3DObject key={i}
                    position={[ Constants.zero + val - moveBack, -0.01, Constants.negativeFive ]}
                    rotation={[ 90, Constants.zero, Constants.zero ]}
                    scale={[ 0.03, 0.03, 0.03 ]}
                    source={Rating}
                    materials={[ 'rating']}
                    type="OBJ"
                    animation={{ name: 'rotation', run: this.state.animate, loop: true }}
                    
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
            
        return <ViroARScene>
            <ViroAmbientLight color="#ffffff" intensity={200}/>

            {
                
                ProductArray.map((product, index) => <ViroARImageMarker target={product.concatName} onAnchorFound={this._onAnchorFound} key={index}> 
                    <ViroVideo
                        source={product.advert}
                        height={2}
                        width={2}
                        border={2}
                        loop={true}
                        position={[ -1.5,Constants.zero,-5]}
                    /> 
                    <ViroText 
                        fontSize={12}
                        style={Style.ProductName} 
                        position={[ Constants.one, Constants.one, Constants.negativeFive ]}
                        width={15} 
                        height={5} 
                        extrusionDepth={8}
                        materials={[ 'frontMaterial', 'backMaterial', 'sideMaterial' ]}
                        text= {product.name} 
                    />
                    <ViroText 
                        fontSize={12}
                        style={Style.ProductName} 
                        position={[ Constants.one,0.5, Constants.negativeFive ]}
                        width={15} 
                        height={5} 
                        extrusionDepth={8}
                        materials={[ 'frontMaterial', 'backMaterial', 'sideMaterial' ]}
                        text={'R' + product.price.toLocaleString()} 
                    />
                    <ViroText 
                        position={[ 0, -1.0, Constants.zero ]}
                        rotation={[ -90, Constants.zero, Constants.zero ]}
                        text={product.name} 
                        width={2} height={2}
                        style={{fontFamily:"Arial", fontSize:10, fontStyle:"italic", color:"#0000FF"}}
                    /> 
                    {/* <ViroText fontSize={1}
                        position={[0,-1, Constants.zero ]}
                        rotation={[ -90, Constants.zero, Constants.zero ]}
                        text={product.name} 
                        textAlign="left"
                        textAlignVertical="top"
                        textLineBreakMode="justify"
                        textClipMode="clipToBounds"
                        color="#ff0000"
                        width={2} height={2}
                        style={{fontFamily:"Arial", fontSize:20, fontStyle:"italic", color:"#0000FF"}}

                    /> */}
                    
                    {this._rating(product.rating)}

                          
                    <ViroNode
                        position={[ Constants.pointOne, Constants.pointOne, Constants.zero ]}>
                        <Viro3DObject
                            onClick={() => this.handleclick(product.name, product.source,product.price)}
                            scale={[ Constants.one, Constants.one , Constants.one ]}
                            source={Cart}
                            type="OBJ"
                            animation={{ name: this.state.animationType, run: this.state.animate, loop: true, onFinish: this._onAnimationFinished }} 
                        />
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
    rating: {
        diffuseColor: '#D4AF37',
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