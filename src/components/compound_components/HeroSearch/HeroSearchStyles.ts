import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 14,
        paddingLeft: 28,
        width: '100%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iconContainer: {
        padding: 0,
        width: 48,
        height: 48,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    inputContainer: {
        marginLeft: 10,
        width: null, 
        height: '100%', 
        flexDirection: 'row', 
        flex: 1, 
        alignItems: 'center'
    }
});