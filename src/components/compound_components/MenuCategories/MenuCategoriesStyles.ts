import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 0,
        width: '100%',
        height: 135,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        overflow: 'hidden'
    },
    categoriesContainer: {
        marginTop: 12,
        width: '100%',
        height: null,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});