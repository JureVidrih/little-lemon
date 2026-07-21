import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    leftContainer: {
        width: 100,
        height: '100%',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    rightContainer: {
        paddingLeft: 14,
        paddingTop: 7,
        width: null,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    dishImage: {
        width: 72,
        height: 72
    }
});