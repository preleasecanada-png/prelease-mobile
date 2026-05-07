import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { alignSelf, height, marginRight, marginTop, verticalAlign, width } from 'styled-system';
import { StatusBar } from 'react-native';

const styles = EStyleSheet.create({
  welcomeScreenImages: {
    height: "90%",
    // width: '100%',
    // height: "100%",
    aspectRatio: 12/16,
    // '@media android': {
    //   marginTop: StatusBar.currentHeight
    // }
  },
  welcomeScreenHeadingSmall1:{
    fontSize: Fonts.size.h4,


  },
  welcomeScreenHeading1: {
    marginTop: '10rem',
    // marginBottom: '10rem',
    textAlign: 'center',
    width: '100%',
    color: Colors.black,
    // lineHeight: '38rem',
    ...Fonts.style.boldText,
    fontSize: Fonts.size.h3,
    verticalAlign: 'middle',
    alignSelf: 'center',
    paddingHorizontal: 20
  },
  welcomeScreenHeading2: {
    marginTop: 0,
    // color: Colors.primary,
  },
  welcomeScreenPeregraph: {
    color: Colors.darkGray,
    textAlign: 'center',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // marginBottom: '67rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
    paddingHorizontal: 20,
  },
  welcomeScreenPeregraphSmall: {
    fontSize: Fonts.size.tiny,
  },
  skip: {
    color: Colors.black,
    fontSize: Fonts.size.medium,
    marginLeft: 'auto',
    // marginTop: '10rem',
    textDecorationLine: 'underline',
    marginRight: 10
  }
});

export default styles;
