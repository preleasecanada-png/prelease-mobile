import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  letterSpacing,
  marginBottom,
  textAlign,
} from 'styled-system';
import {color} from 'react-native-reanimated';

const styles = EStyleSheet.create({
  logo: {
    // aspectRatio: 9/16,
    width: '400rem',
    height: '45rem',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // marginVertical: '25rem'
  },
  container: {
    paddingHorizontal: '8rem',
    paddingBottom: '15rem',
    '@media ios': {
      flex: isIphoneX() ? 1 : 0,
      paddingTop: isIphoneX() ? '75rem' : '81rem',
    },
    '@media android': {
      paddingTop: '20rem',
    },
    backgroundColor: Colors.white,
  },
  heading: {
    // marginBottom: '18rem',
    textAlign: 'center',
    width: '100%',
    color: Colors.black,
    lineHeight: '28rem',
    fontSize: Fonts.size.h3,
    ...Fonts.style.boldText,
  },
  signupLoginInputGroup: {
    paddingHorizontal: '10rem',
    paddingVertical: '25rem',
  },
  lastInputStyle: {
    marginBottom: '15rem',
  },
  passwordInputStyle: {
    marginBottom: 0,
  },
  signUpLogInBtn: {
    marginBottom: '17rem',
    borderRadius: 50,
  },
  googleFaceBookBtnRow: {
    flexDirection: 'column',
    marginBottom: '15rem',
  },
  bottomAccountText: {
    lineHeight: '18rem',
    color: Colors.black,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.medium,
  },

  bottomGuestText: {
    lineHeight: '18rem',
    color: Colors.darkGray2,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.medium,
    marginBottom: '22rem',
  },
  loginSignupBtnText: {
    lineHeight: '18rem',
    color: Colors.primary,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.medium,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    marginBottom: 5,
  },
  labelStyle: {
    color: Colors.black,
    fontSize: Fonts.size.tiny,
    marginBottom: '5rem',
    textAlign: 'left',
    lineHeight: '18rem',
    fontSize: Fonts.size.small,
    ...Fonts.style.boldText,
  },
  otherTextStyle: {
    color: Colors.darkerGray,
    fontSize: Fonts.size.small,
    textAlign: 'center',
    lineHeight: '18rem',
    ...Fonts.style.boldText,
  },
  googleFaceBookBtnStyle: {
    width: '100%',
  },

  forgotPasswordLink: {
    marginBottom: '22rem',
    marginLeft: 'auto',
    color: Colors.grayText,
    fontSize: Fonts.size.small,
    textAlign: 'center',
    lineHeight: '18rem',
    ...Fonts.style.boldText,
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontSize: Fonts.size.tiny,
    lineHeight: '15rem',
    color: Colors.darkGray,
    ...Fonts.style.textInputText,
  },
  forgotPasswordPageText: {
    color: Colors.grayText,
    lineHeight: '21rem',
    marginBottom: '20rem',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.tiny,
    paddingHorizontal: '20rem',
    letterSpacing: '0.3rem',
    paddingVertical: '10rem',
  },
});

export default styles;
