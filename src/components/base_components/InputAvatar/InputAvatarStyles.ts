import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: null
    },
    innerContainer: {
        width: '100%', 
        height: null, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 15
    },
    label: {
        marginBottom: 3,
        fontSize: 12,
        fontWeight: 'bold'
    }
});