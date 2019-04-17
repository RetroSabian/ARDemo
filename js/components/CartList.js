import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import { Style } from '../Constants/styleConstants';
import * as Constants from '../Constants/constant';

class CartList extends Component {
    constructor(props) {
        super(props);
        this.setTableItems = this.setTableItems.bind(this);
    }
    
    setTableItems({ item }) {
        return <TouchableWithoutFeedback >
            <View style={Style.FlatListViewItem}>
                <View style= {Style.FlatListViewPlaceholder}>
                    <Image source={ item.source } style={Style.FlatListViewImage}/>
                    <Text style={Style.FlatListViewQty}>x{item.qty}</Text>
                </View>
            </View> 
        </TouchableWithoutFeedback>;
    }

    render() {
        return <FlatList
            data={this.props.CartState.InCart}
            keyExtractor={(item, index) => index.toString()}
            style={Style.FlatListView}
            renderItem={this.setTableItems}
            numColumns={Constants.ten}
            extraData = {this.props} />;
    }
}

CartList.propTypes = {
    CartState: PropTypes.shape({
        InCart: PropTypes.array
    })
};

const mapStateToProps = (state) => ({
    CartState: state.CartState
});

export default connect (mapStateToProps)(CartList);