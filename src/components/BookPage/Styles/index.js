import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { alignItems, flex, justifyContent, letterSpacing, lineHeight, marginBottom, marginLeft, marginTop } from 'styled-system';
import { isIphoneX } from '../../../libs/Utils';

const styles = EStyleSheet.create({

  container: {
    paddingBottom: '15rem',
    // paddingHorizontal: '20rem',
    backgroundColor: Colors.white,
  },
  content:{
    paddingHorizontal: '20rem',
    // paddingVertical: '20rem',

  },
  checkboxContainer:{

  },
  bookPropertyBtn: {
    maxWidth: '165rem',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  propertyHeadingStyle: {
    marginBottom: 0
  },
  bookingOptionsContainer:{

    marginBottom: 20
  },
  propertyHeadingTextStyle:{
    fontSize: Fonts.size.regular,

  },
  subTextStyle:{
    textAlign: 'left',
    color: Colors.darkGray,

  },
  backdropStyle: {
    position: 'relative',
    backgroundColor: Colors.transparent,
    height: 'auto',
    width: '100%'
  },
  calenderArrows: {
    width: '20rem',
    height: '20rem'
  },
  containerStyle: {
    backgroundColor: Colors.transparent,
    paddingBottom: 0,
    marginBottom: '-15rem'
  },
  dayHeaderStyle: {
    backgroundColor: Colors.transparent
  },
  dayStyle: {
    width: '30rem',
    height: '30rem',
    borderRadius: '30rem',
    borderWidth: '3rem',
    borderColor: Colors.transparent
  },
  selectedStyle: {
    borderColor: Colors.white,
    width: '30rem',
    height: '30rem',
    borderRadius: '30rem',
    borderWidth: '3rem',
    backgroundColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: '6rem'
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 20,
    shadowColor: Colors.primary
  },
  dayTextStyle: {
    color: Colors.black,
    lineHeight: '21rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText
  },
  selectedTextStyle: {
    color: Colors.white,
    lineHeight: '21rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.buttonText
  },
  headerTextStyle: {
    letterSpacing: '-0.02rem',
    color: Colors.black,
    fontSize: Fonts.size.h4,
    ...Fonts.style.buttonText
  },
  pickerOpenText: {
    height: 0
  },
  dayHeaderTextStyle: {
    color: Colors.black,
    lineHeight: '21rem',
    opacity: 1,
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.textInputText
    },
    '@media android': {
      ...Fonts.style.buttonText
    }
  },
  checkBoxItem:{
    flex: 1,
    // marginLeft: '10rem',
    paddingVertical: '7rem',
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxText:{
    marginLeft: '10rem',
    fontSize: Fonts.size.tiny,
    color: Colors.black,
    '@media ios': {
     ...Fonts.style.normalText
    },
    '@media android': {
     ...Fonts.style.buttonText
    }
  },
    
  learnMoreBtn: {
    width: '80rem',
    '@media ios': {
      flex: isIphoneX() ? 0.1 : 0.2
    },
    '@media android': {
      flex: 0.2
    }
  },
  learnMoreBtnText: {
    textAlign: 'left',
    lineHeight: '18rem',
    color: Colors.primary,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.primary,
    fontSize: Fonts.size.small,
    ...Fonts.style.boldText
  },
  LineSeperatorStyle:{
    backgroundColor: Colors.darkGray2,
    height: 1,
    marginVertical: 10

  },
  subHeading:{
    fontSize: Fonts.size.small,
    ...Fonts.style.boldText,
    color: Colors.black,
    letterSpacing: 0.25,
  },
  subHeadingContainerStyle:{
    marginBottom: 0,
    paddingBottom: 0,

  },
  subTitleTextStyle:{
    ...Fonts.style.textInputText,
    textAlign: 'left',
    fontSize: Fonts.size.xTiny,
    color: Colors.grayText,
    letterSpacing: 0.25,
    marginBottom: 10
  },
  flexRow:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  buttonsContainer:{
    paddingHorizontal: 20, paddingVertical: 7,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  btnStyle:{
    borderRadius: 50,
    // width: 100
  },
  cancelButtonTextStyle:{
    color: Colors.black,
    textDecorationLine: 'underline',
    textDecorationStyle:'solid',
    textDecorationColor: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText

  },
});

export default styles;
