import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  bodyContainer: {
    position: 'static',
    paddingTop: 25,
    width: '100%',
    flex: 1.4,
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  formContainer: {
    position:  'absolute',
    top: '55%',
    left: '50%',
    width: '72%',
    height: 190,
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: '50%',
    width: '70%',
    transform: [{ translateX: '-50%' }]
  }
});