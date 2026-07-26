import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        position: 'absolute',
        top: '45%',
        left: '50%',
        width: 250, 
        height: 250,
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
    },
    indicator: {
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
    }
});