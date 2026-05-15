import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../theme';

const styles = EStyleSheet.create({
  sliderRatingContainer: {
    // marginTop: 8,
    // position: 'absolute',
    // right: '15rem',
    // top: '15rem',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.lighterBgBlack,
    paddingHorizontal: '5rem',
    // paddingVertical: '3.5rem',
    borderRadius: '4rem',
  },
  sliderRatingStarImg: {
    width: '12rem',
    height: '12rem',
  },
  sliderRatingStarText: {
    paddingLeft: '4rem',
    color: Colors.black,
    fontSize: Fonts.size.mediumNormal,
    lineHeight: '15rem',
    ...Fonts.style.textInputText,
    underlineStyle: 'underline',
    textDecorationColor: Colors.black,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});
export default styles;
