import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { alignItems, borderColor, borderRight, borderWidth, justifyContent, margin, marginRight, width } from 'styled-system';

const styles = EStyleSheet.create({
  logoHeadingStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20
  },
  logo: {
    // aspectRatio: 9/16,
    width: '200rem',
    height: '40rem',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // marginVertical: '25rem'
  },
  heading: {
    // marginBottom: '18rem',
    textAlign: 'center',
    width: '100%',
    color: Colors.black,
    lineHeight: '28rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.boldText
  },
  phoneInputStyle:{
    backgroundColor: Colors.lightGray,
   
    height: '50rem',
    
    paddingVertical: 0,
    

  },
  phoneFlagButtonStyle:{
    width: 50,
    paddingHorizontal: 10,
    margin: 0,

  },
  phoneCodeStyle:{
    // borderRightWidth: 1,
    // borderColor: Colors.darkGray2,
  },
  phoneTextInputStyle:{
    color: Colors.black, fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText
    },
    '@media android': {
      ...Fonts.style.textInputText
    },

  },
  phoneCountryPickerButtonStyle:{
    paddingHorizontal: '10rem',
    margin: 0,
    width: 50,
    marginRight: 0,


  },
  phoneInputContatinerStyle:{
    width: '100%',
    backgroundColor: Colors.lightGray,
    // borderRadius: '12rem',
    paddingHorizontal: '15rem',
    paddingVertical: 0,
    color: Colors.black,
    marginBottom: '10rem',
    borderWidth: 1,
    // height: '50rem',
    borderColor: Colors.darkGray2,
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText
    },
    '@media android': {
      ...Fonts.style.textInputText
    },
    
    borderRadius: 50,
    

  },
  allInputStyle: {
    backgroundColor: Colors.lightGray,
    // borderRadius: '12rem',
    paddingVertical: '10rem',
    paddingHorizontal: '15rem',
    color: Colors.black,
    marginBottom: '10rem',
    borderWidth: 1,
    borderColor: Colors.darkGray2,
    height: '50rem',
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText
    },
    '@media android': {
      ...Fonts.style.textInputText
    },
    
    borderRadius: 50,
  },
  passwordEyeImgBtn: {
    position: 'absolute',
    right: '12rem',
    top: '18rem'
  },
  passwordEyeImg: {
    width: '16rem',
    height: '16rem',
    opacity: 1
  },
  commanText: {
    // lineHeight: '18rem',
    color: Colors.darkGray,
    textAlign: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.tiny
  },
  googleImg: {
    height: '25rem',
    width: '25rem'
  },
  facebookImg: {
    height: '25rem',
    width: '25rem'
  },
  googleFaceBookBtn: {
    width: '100%',
    borderRadius: '50rem',
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '10rem',
    paddingHorizontal: '17rem',
    marginVertical: '10rem',
    borderColor: Colors.darkGray2,
    borderWidth: 1
  },
  googleFaceBookBtnText: {
    paddingLeft: '17rem',
    fontSize: Fonts.size.medium,
    lineHeight: '22.5rem',
    color: Colors.black,
    ...Fonts.style.textInputText
  },
  resetInputStyle: {
    paddingVertical: '15rem',
    paddingRight: '35rem',
    color: Colors.black,
    marginBottom: '20rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.lightGray,
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText
    },
    '@media android': {
      ...Fonts.style.textInputText
    }
  },
  resetPasswordEyeImgBtn: {
    position: 'absolute',
    right: '12rem',
    top: '16rem'
  },
  bottomAccountText: {
    lineHeight: '18rem',
    color: Colors.black,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.medium
  },
  loginSignupBtnText: {
    lineHeight: '18rem',
    color: Colors.primary,
    marginTop: 'auto',
    alignSelf: 'center',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.medium
  },
});

export default styles;
