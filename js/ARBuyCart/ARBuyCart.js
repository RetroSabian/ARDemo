'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroMaterials,
  ViroNode,
  ViroAnimations,
  Viro3DObject,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroSphere,
  ViroSpotLight,
  ViroQuad,
} from 'react-viro';

var createReactClass = require('create-react-class');

var ARCarDemo = createReactClass({
    getInitialState() {
      return {
        texture: "white",
        playAnim: false,
        animate: false,
      }
    },
  
    render: function() {
      return (
        <ViroARScene>
  
          {/* <ViroLightingEnvironment source={require('./res/tesla/garage_1k.hdr')}/> */}
  
          <ViroARImageMarker 
          target={"Romany"} 
          onAnchorFound={this._onAnchorFound}>
            <Viro3DObject
              scale={[0, 0, 0]}
              source={require('./res/Cart.obj')}
              resources={[require('./res/Cart.mtl'),]}
              type="OBJ"
              animation={{name:"scale", run:this.state.animate,}}
               />
          </ViroARImageMarker>
        </ViroARScene>
      );
    },
    _onAnchorFound() {
      this.setState({
        animate: true,
      })
      alert('found')
    },
    _toggleButtons() {
      this.setState({
        animName: (this.state.animName == "scaleUp" ? "scaleDown" : "scaleUp"),
        playAnim: true
      })
    },
});

  ViroARTrackingTargets.createTargets({
    Romany : {
    source : require('./res/TestImage3.jpg'),
      orientation : "Up",
      physicalWidth : 0.165 // real world width in meters
    }
  });

  ViroAnimations.registerAnimations({
    scale:{properties:{scaleX:.09, scaleY:.09, scaleZ:.09,},
                  duration: 500, easing: "bounce"}
});
  
  module.exports = ARCarDemo;
  