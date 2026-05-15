import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {
  alignItems,
  alignSelf,
  backgroundColor,
  borderRadius,
  marginTop,
  textAlign,
} from 'styled-system';
import {color} from 'react-native-reanimated';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
    backgroundColor: Colors.white,
  },
  commanHeadingContainerStyle: {
    alignSelf: 'flex-start',
    marginTop: '15rem',
  },
  bottomSheetContent: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: '10rem',
    flex: 1,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: '5rem',
    },
  },
  commanHeadingTextStyle: {
    fontSize: Fonts.size.h3,
    // textAlign: 'left'
  },
  profileInputFocusedStyle: {
    backgroundColor: Colors.white,
    color: Colors.black,
  },
  profileInputStyle: {
    borderRadius: 8,
    color: Colors.inputGreyColor,
    // borderBottomWidth: '2rem',
    // borderColor: Colors.gray,
    // backgroundColor: Colors.transparent,

    // paddingHorizontal: 0,
    // paddingTop: '8rem',
    // paddingBottom: '15rem',
    // fontSize: Fonts.size.medium,
    // ...Fonts.style.normalText
  },
  inputHelpingTextStyle: {
    // marginTop: 50,
    color: Colors.black,
    fontSize: Fonts.size.tiny,
    marginBottom: '15rem',
    textAlign: 'left',
    lineHeight: '18rem',
    ...Fonts.style.textInputText,
  },
  inputLabelText: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
    marginBottom: '15rem',
    textAlign: 'left',
    lineHeight: '18rem',
    ...Fonts.style.textInputText,
  },
  govermentIdContactList: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    flexDirection: 'row',
    paddingTop: '21rem',
    paddingBottom: '16rem',
  },
  govermentIdContactText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  rightArrowImg: {
    width: '9.78rem',
    height: '16rem',
    marginLeft: 'auto',
  },
  profileSaveChangeBtn: {
    marginTop: '5rem',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    borderRadius: 50,
  },
});

export default styles;
