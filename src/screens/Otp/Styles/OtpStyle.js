import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';
import {
  borderColor,
  borderWidth,
  marginBottom,
  marginLeft,
  paddingBottom,
} from 'styled-system';

const styles = EStyleSheet.create({
  container: {
    flex: isIphoneX() ? 1 : 0,
    paddingTop: '37rem',
    paddingBottom: '15rem',
    paddingHorizontal: '15rem',
  },
  signupLoginInputGroup: {
    paddingHorizontal: '25rem',
    flexDirection: 'column',
    flex: 1,
  },
  confirmNumberText: {
    width: '250rem',
    lineHeight: '21rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginBottom: '20rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.small,
    color: Colors.grayText,
  },
  verificationEmailText: {
    width: '250rem',
    lineHeight: '21rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '30rem',
    marginTop: '10rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
    color: Colors.black,
  },
  bottomAccountText: {
    lineHeight: '18rem',
    color: Colors.black,
    // marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.medium,
  },
  loginSignupBtnText: {
    lineHeight: '18rem',
    color: Colors.primary,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.medium,
  },
  otpInputStyle: {
    width: '40rem',
    height: '40rem',
    backgroundColor: Colors.white,
    borderRadius: '8rem',
    textAlign: 'center',
    color: Colors.black,
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurBlack,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
    borderColor: Colors.darkGray2,
    borderWidth: 1,
    marginHorizontal: '10rem',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '33rem',
  },
  bottomContinueBtn: {
    // flex: 1,
    paddingHorizontal: '25rem',
  },
  otpContinueBtn: {
    marginTop: 'auto',
    marginBottom: '17rem',
    borderRadius: 50,
  },
  loaderContent: {
    width: '93rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20rem',
    marginTop: '19rem',
  },
  loaderDotsStyle: {
    color: Colors.primary,
    fontSize: '75rem',
    letterSpacing: '-12rem',
    lineHeight: '30rem',
  },
  logoHeadingStyle: {
    marginHorizontal: '-25rem',
    paddingBottom: 10,
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
  resendOtpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '15rem',
  },
  resendOtpText: {
    lineHeight: '18rem',
    color: Colors.black,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.buttonText,
  },
  resendOtpTimerText: {
    lineHeight: '18rem',
    color: Colors.black,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.textInputText,
    marginLeft: 10,
  },
});

export default styles;
