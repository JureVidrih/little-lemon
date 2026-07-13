import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: null
    },
    label: {
        marginBottom: 3,
        fontSize: 12,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingHorizontal: 19,
        paddingVertical: 12,
        width: '100%',
        height: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#ffffff'
    },
    invalidValueLabel: {
        marginVertical: 2,
        fontSize: 12,
        color: '#ff0000'
    }
});