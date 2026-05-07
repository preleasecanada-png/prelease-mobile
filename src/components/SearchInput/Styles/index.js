import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { alignItems, backgroundColor, borderRadius, fontSize, justifyContent, letterSpacing, width, zIndex } from 'styled-system';


const styles = EStyleSheet.create({
  topLabel: {

    ...Fonts.style.boldText,
    fontSize: Fonts.size.mediumNormal,
    color: Colors.black,
    letterSpacing: '0.2rem',
  },
  allInputStyle: {
    backgroundColor: Colors.white,
    // height: '40rem',
    // borderTopLeftRadius: '12rem',
    // borderTopRightRadius: '12rem',
    // borderRadius: '12rem',
    // paddingVertical: '12rem',
    paddingLeft: '20rem',
    paddingRight: '40rem',
    color: Colors.grayText,
    // borderWidth: '1rem',
    // borderColor: Colors.lightGray,
    ...Fonts.style.normalText,
    // fontSize: Fonts.size.medium,
    fontSize: 12,
    letterSpacing: '0.5rem',
    borderRadius: 50,
    width: "100%",

    // shadowOffset: {
    //   width: '1rem',
    //   height: '1rem'
    // },
    // shadowOpacity: '1rem',
    // shadowRadius: '10rem',
    // elevation: 8,
    // shadowColor: Colors.black,
  },
  surface: {
    height: '45rem',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    // padding: '12rem',
    // shadowColor: Colors.black,
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.5,
  },
  gradient: {
    width: '100%',
    borderRadius: 25,
    padding: 2,
    shadowColor: Colors.black,
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    elevation: 10, // Adjust for Android shadow
  },
  searchIcon: {
    width: '14rem',
    height: '14rem',
    backgroundColor: Colors.white,
  },
  rightButton:{
    position: 'absolute',
    // top: '13rem',
    right: '17.71rem',

  },
  leftButton:{
    position: 'absolute',
    // top: '11rem',
    left: '15.71rem',
    zIndex: 999,


  },
  searchIconLeft: {
    // width: '16rem',
    // height: '16rem',
    tintColor: Colors.black,
  }
});

export default styles;
