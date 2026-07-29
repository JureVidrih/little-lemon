import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        overflow: 'hidden'
    },
    placeholderView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#298dff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeholderLabel: {
        color: '#ffffff'
    }
});

export const configurations = {
    normal: {
        container: {
            width: 100,
            height: 100,
            borderRadius: 50
        },
        label: {
            fontSize: 36
        }
    },
    header: {
        container: {
            width: 60,
            height: 60,
            borderRadius: 30
        },
        label: {
            fontSize: 28
        }
    }
}