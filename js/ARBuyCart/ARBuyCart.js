'use strict';

import React from 'react';

import {
  ViroARScene,
  ViroAnimations,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroNode,
  ViroAmbientLight
} from 'react-viro';

var createReactClass = require('create-react-class');

var ARCarDemo = createReactClass({
    getInitialState() {
      return {
        playAnim: false,
        animate: false,
        animationType:'spawn'
      }
    },
  
    render: function() {
      return (
        <ViroARScene>
          <ViroAmbientLight color="#ffffff" intensity={200}/>
          <ViroARImageMarker target={"box"} onAnchorFound={this._onAnchorFound}> 
            <ViroNode
            position={[0.1, 0.1, 0]}>
              <Viro3DObject
              onClick={this.handleclick}
                scale={[1, 1, 1]}
                source={require('./res/cart/cart.obj')}
                type="OBJ"
                animation={{name:this.state.animationType, run:this.state.animate, loop:true, onFinish:this._onAnimationFinished}} />
            </ViroNode>
            
          </ViroARImageMarker>
        </ViroARScene>
      );
    },
    _onAnimationFinished(){
      this.setState({
        animationType:'rotation',
      })
    },
    handleclick(){
      alert("told you so Taylor")  
    },
    _onAnchorFound() {
      this.setState({
        animate: true,
      })
      alert('found');
    }
    });
  
  ViroARTrackingTargets.createTargets({
    box : {
      source : require('./res/TestImage3.jpg'),
      orientation : "Up",
      physicalWidth : 0.165 // real world width in meters
    }
  });
  
  ViroAnimations.registerAnimations({
      spawn:{properties:{scaleX:.09, scaleY:.09, scaleZ:.09,},
                duration: 500, easing: "bounce"},
      rotation:{properties:{rotateY:"+=45"},
                  duration: 1000}
  });
  module.exports = ARCarDemo;
  