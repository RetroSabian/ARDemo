import React, { Component } from 'react';
import { View,
    Image,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Animation from 'lottie-react-native';
import SuccessAnimation from './SuccessAnimation';

class ARInitializationUI extends Component {
    constructor(props) {
        super(props);

        this._setAnimation = this._setAnimation.bind(this);
        this._onSuccessAnimFinished = this._onSuccessAnimFinished.bind(this);
        this.state = {
            initializing_text_src_img: require('../res/icon_initializing_text_1.png')
        };
    }

    _setAnimation(animation) {
        this.animation = animation;
        if (this.animation !== undefined) {
            this.animation.play();
        }
    }

    render() {
        if (!this.props.UIState.TrackerInitialized) {
            return (
                <View pointerEvents={'none'} style={this.props.style}>
                    {/* <View style={{ width: 172.075, height: 100 }}>
                        <Animation
                            ref={this._setAnimation}
                            style={{
                                width: this.props.width,
                                height: this.props.height,
                                alignSelf: 'center'
                            }}
                            loop={true}
                            source={require('../res/animations/data.json')}
                        />
                    </View> */}
                    <Image source={this.state.initializing_text_src_img}/>
                </View>
            );
        } else {
            return (
                <View pointerEvents={'none'} style={localStyles.SuccessView}>
                    <SuccessAnimation  
                        stateImageArray={[ require('../res/icon_initializing_device_2.png') ]}
                        style={localStyles.arSceneInitializeSuccess} />
                    <SuccessAnimation 
                        onFinish={this._onSuccessAnimFinished}
                        stateImageArray={[ require('../res/icon_initializing_text_2.png') ]}/>
                </View>
            );
        }
    }

    // Callback function passed to <SuccessAnimation> component
    // This is so that first time user sees "Initializing ...", later times user sees "Re-Calibrating ...."
    _onSuccessAnimFinished() {
        this.setState({
            initializing_text_src_img: require('../res/icon_initializing_device_3.png')
        });
    }
}

ARInitializationUI.propTypes = {
    style: PropTypes.any,
    UIState: PropTypes.shape({
        TrackerInitialized: PropTypes.bool
    }),
    width: PropTypes.number,
    height: PropTypes.number
};

ARInitializationUI.defaultProps = {
    width: 172.075,
    height: 100
};

const localStyles = StyleSheet.create({
    arSceneInitializeSuccess: {
        height: 61,
        width: 35,
        alignSelf: 'center',
    },
    SuccessView: { 
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        width: '100%', 
        height: 120, 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    }
});

const mapStateToProps = (state) => ({
    UIState: state.UIState
});

export default connect(mapStateToProps)(ARInitializationUI);