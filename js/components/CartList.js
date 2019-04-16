import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class CartList extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <View>
            <Text>Your list</Text>
        </View>;
    }
}

CartList.propTypes = {
    CartState: PropTypes.shape({
        inCart: PropTypes.array
    })
};

const mapStateToProps = (state) => ({
    CartState: state.CartState
});

export default connect (mapStateToProps)(CartList);