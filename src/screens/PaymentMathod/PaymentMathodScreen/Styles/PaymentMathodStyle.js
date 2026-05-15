import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../../theme';
import {borderRadius} from 'styled-system';

const styles = EStyleSheet.create({
  flexRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commanHeadingContainerStyle: {
    marginBottom: 10,
    // borderBottomWidth: 1,
    // borderColor: "#CCCCCC"
  },
  labelStyle: {
    color: Colors.black,
    fontSize: Fonts.size.tiny,
    marginBottom: '15rem',
    textAlign: 'left',
    lineHeight: '18rem',
    fontSize: Fonts.size.small,
    ...Fonts.style.boldText,
  },
  lineSeperator: {
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  headingText: {
    color: Colors.white,
    fontSize: Fonts.size.h3,
  },
  // container: {
  //   paddingVertical: '15rem',
  //   paddingHorizontal: '20rem',
  //   backgroundColor: Colors.white
  // },
  container: {
    paddingTop: '23rem',
    paddingHorizontal: '20rem',
    backgroundColor: Colors.white,
  },
  addPaymentBtn: {
    marginTop: '14rem',
    width: '122rem',
    borderRadius: 50,
    marginLeft: 'auto',
  },
  inputLabelText: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
    marginBottom: '5rem',
    textAlign: 'left',
    lineHeight: '18rem',
    ...Fonts.style.textInputText,
  },
  inputStyle: {
    marginBottom: '15rem',
    paddingHorizontal: '10rem',
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: '16rem',
  },
  buttonsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnStyle: {
    borderRadius: 50,
    width: 100,
  },
  cancelButtonTextStyle: {
    color: Colors.black,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.black,
    fontSize: Fonts.size.regular,
  },
});

export default styles;
