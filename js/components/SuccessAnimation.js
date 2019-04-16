import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight,
    Animated,
    Easing,
    View,
} from 'react-native';
import * as Constants from '../Constants/constant';
import constants from 'jest-haste-map/build/constants';

class SuccessAnimation extends Component {
    constructor(props) {
        super(props);
        this.scaleValue = new Animated.Value(Constants.zero);
        this.fadeInValue = new Animated.Value(Constants.zero);

        this.fadeAndScale = this.fadeAndScale.bind(this);
        this._onPress = this._onPress.bind(this);

        this.buttonScale = this.scaleValue.interpolate({
            inputRange: [ Constants.zero, Constants.pointEight, Constants.one ],
            outputRange: [ constants.one, Constants.onePointTwo, Constants.one ]
        });
        this.buttonOpacity = this.fadeInValue.interpolate({
            inputRange: [ Constants.zero, Constants.pointZeroEightFive, Constants.pointNineOneFive, Constants.one ],
            outputRange: [ Constants.zero, Constants.one , Constants.one, Constants.zero ]
        });

    }
    componentDidMount() {
        this.fadeAndScale();
    }
    render() {
        return (
            <TouchableHighlight underlayColor="#00000000" onPress={this._onPress}>
                <View>
                    <Animated.Image 
                        source={this.props.stateImageArray[Constants.zero]}
                        style={[ this.props.style,{ opacity: this.buttonOpacity },
                            {
                                transform: [ { scale: this.buttonScale } ]
                            } ]} 
                    />
                </View>
            </TouchableHighlight>
        );
    }

    _onPress() {
        requestAnimationFrame(() => {
            this.props.onPress();   
        });
    }
    fadeAndScale() {
        this.scaleValue.setValue(Constants.zero);
        Animated.parallel([
            Animated.timing(
                this.scaleValue,
                {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.easeInOutBack,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(
                this.fadeInValue,
                {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true, 
                }
            )
        ]).start(this.props.onFinish);
    }
}

SuccessAnimation.propTypes = {
    onPress: PropTypes.func.isRequired,
    stateImageArray: PropTypes.array.isRequired,
    style: PropTypes.any,
    selected: PropTypes.bool,
    onFinish: PropTypes.func
};

export default SuccessAnimation;