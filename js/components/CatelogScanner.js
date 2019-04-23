import React, { Component } from 'react';
import {
    ViroARScene,
    ViroAmbientLight,
    ViroARImageMarker,
    ViroNode,
    Viro3DObject,
    ViroARTrackingTargets,
    ViroAnimations
} from 'react-viro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UiActions from '../redux/UI/UIActions';
import * as CartActions from '../redux/Cart/CartActions';
import Cart from '../res/Cart/cart.obj';
import * as Constants from '../Constants/constant';
import PropTypes from 'prop-types';
import { CatelogArray } from '../Constants/catelogConstant';

class CatelogScanner extends Component {
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

    render() {
        
        return <ViroARScene>
            <ViroAmbientLight color="#ffffff" intensity={200}/>
            {
                CatelogArray.map((product, index) => <ViroARImageMarker target={product.concatName} onAnchorFound={this._onAnchorFound} key={index}> 
                    <ViroNode
                        position={[ Constants.zero, Constants.zero, Constants.zero ]}>
                        <Viro3DObject
                            onClick={() => this.handleclick(product.name, product.source,product.price)}
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
    CatelogArray.reduce((accObject, product) => {
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

CatelogScanner.propTypes = {
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

const mapStateToProps = (state) => ({
    UIState: state.UIState,
    CartState: state.CartState
});

const mapActionsToProps = (dispatch) => ({
    uiActions: bindActionCreators(UiActions, dispatch),
    cartActions: bindActionCreators(CartActions, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(CatelogScanner);