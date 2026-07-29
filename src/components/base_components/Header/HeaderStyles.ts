import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: null
    },
    headerText: {
        marginVertical: 10,
        fontWeight: 'bold'
    }
});

export const fontSizes = {
    1: 40,
    2: 32,
    3: 28,
    4: 26,
    5: 22,
    6: 19
}

export type fontSizeType = 1 | 2 | 3 | 4 | 5 | 6