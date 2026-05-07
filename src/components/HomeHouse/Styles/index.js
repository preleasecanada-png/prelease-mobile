import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { lineHeight, marginBottom, textAlign } from 'styled-system';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '20rem',
    paddingTop: '12rem',
    backgroundColor: Colors.white
  },
  fullScreenSliderContainer: {
    height: '200rem'
  },
  sliderBgImagestyle: {
    height: '200rem'
  },
  carouselSliderContainerStyle: {
    height: '252rem'
  },
  firstBookingHeadingStyle: {
    marginTop: '23rem'
  },
  commanHeadingTextStyle:{
    fontSize: Fonts.size.h3,
    
    // fontWeight: '500',
    color: Colors.black,
    textAlign: 'left',
    ...Fonts.style.textInputText,
  },
  commanHeadingTextStyle2:{
    fontSize: Fonts.size.h3,
    ...Fonts.style.lightText,

  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
});

export default styles;
