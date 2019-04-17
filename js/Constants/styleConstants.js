import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
    ProductName: {
        color: '#FFFFFF',
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    listView: {
        flex: 1,
        height: 72,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#000000aa'
    },
    FlatListView: {
        display: 'flex',
        flexGrow: 1
    },
    FlatListViewName: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    FlatListViewQty: {
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10
    },
    FlatListViewPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10
    },
    FlatListViewItem: {
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        flex: 1,
        margin: 1,
        height: 300
    },
    FlatListViewImage: {
        width: 68,
        height: 68,
        resizeMode: 'contain'
    },
    FlatListViewPlaceholder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#DDD',
        height: 68,
        width: 68
    },
});