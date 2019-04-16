import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

class CartList extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        {this.props.CartState.CartList ?
            <View>
                
            </View>: null
        }
}

CartList.propTypes = {
    CartState: PropTypes.shape({
        inCart: PropTypes.array
    })
};

const styles = StyleSheet.create({
});
}

const mapStateToProps = (state) => ({
    CartState: state.CartState
});


export default connect (mapStateToProps)(CartList);