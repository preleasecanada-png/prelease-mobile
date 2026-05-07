import EStyleSheet from 'react-native-extended-stylesheet';
import { alignItems, alignSelf, backgroundColor, borderColor, borderRadius, borderWidth, flex, flexDirection, fontSize, marginTop, width } from 'styled-system';
import { Colors, Fonts } from '../../../theme';

const styles = EStyleSheet.create({
  flexRow:{
    // flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  commanHeadingContainerStyle:{
    marginTop: 10,
    alignSelf: 'center',
    // borderBottomWidth: 1,
    // borderColor: "#CCCCCC"

  },
  lineSeperator:{
    borderBottomWidth: 1,
    borderColor: "#CCCCCC"

  },
  headingText:{
    color: Colors.white,
    fontSize: Fonts.size.h3
  },
  container: {
    paddingVertical: '15rem',
    paddingHorizontal: '20rem',
    backgroundColor: Colors.primary
  },
  addPaymentBtn: {
    marginTop: '14rem',
    width: '232rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  inputLabelText: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
    marginBottom: '5rem',
    textAlign: 'left',
    lineHeight: '18rem',
    ...Fonts.style.textInputText
  },
  inputStyle:{
    marginBottom: '15rem',
    paddingHorizontal: '10rem',
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: '16rem',
  },
  buttonsContainer:{
    paddingHorizontal: 20, paddingVertical: 20,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  btnStyle:{
    borderRadius: 50,
    width: 100
  },
  cancelButtonTextStyle:{
    color: Colors.black,
    textDecorationLine: 'underline',
    textDecorationStyle:'solid',
    textDecorationColor: Colors.black,
    fontSize: Fonts.size.regular,

  }
});

export default styles;
