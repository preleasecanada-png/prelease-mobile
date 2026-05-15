import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../libs/Utils';
import {Colors, Fonts} from '../../theme';
import {flex, justifyContent, paddingBottom} from 'styled-system';

const styles = EStyleSheet.create({
  logo: {
    // aspectRatio: 9/16,
    width: '200rem',
    height: '40rem',
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
      // paddingTop: '20rem'
    },
    backgroundColor: Colors.white,
  },
  signupLoginInputGroup: {
    paddingHorizontal: '10rem',
    paddingBottom: '25rem',
    justifyContent: 'center',
    flex: 1,
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
    marginTop: 15,
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
    marginBottom: 10,
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
    marginBottom: '32rem',
    marginLeft: 'auto',
  },
});

export default styles;
