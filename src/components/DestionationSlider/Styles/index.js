import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { Dimensions } from 'react-native';
import { margin, marginTop, padding } from 'styled-system';

const {width, height} = Dimensions.get("window")


const styles = EStyleSheet.create({
  paginationActiveDot: {
    height: '5rem',
    width: '5rem',
    backgroundColor: Colors.darkerGray,
    borderRadius: '8rem',
    borderWidth: '3rem',
    '@media ios': {
      borderColor: Colors.black
    },
    '@media android': {
      borderColor: Colors.black
    },
    padding: 0
  },
  dotContainerStyle:{

    marginLeft: '0rem',
  },
  paginationInActiveDot: {
    height: '5rem',
    width: '5rem',
    backgroundColor: Colors.darkerGray,
    borderRadius: '8rem',
    borderWidth: 0,
    padding: 0
  },
  sliderContainer: {
    height: '172rem',
    width: width-100,
    borderRadius: '10rem',
    overflow: 'hidden',
    marginRight: '40rem'
  },
  sliderMainImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 16/9
  },
  sliderTextBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '272rem',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingVertical: '15rem',
    paddingLeft: '20rem',
    paddingRight: '15rem'
  },
  sliderHeading: {
    color: Colors.black,
    lineHeight: '23rem',
    marginBottom: '3rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.boldText
  },
  sliderPeregraph: {
    color: Colors.black,
    fontSize: 11,
    '@media ios': {
      ...Fonts.style.textInputText
    },
    '@media android': {
      ...Fonts.style.normalText
    }
  },
  sliderRatingContainer: {
    position: 'absolute',
    right: '15rem',
    top: '15rem',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lighterBgBlack,
    paddingHorizontal: '5rem',
    paddingVertical: '3.5rem',
    borderRadius: '4rem'
  },
  sliderRatingStarImg: {
    width: '10rem',
    height: '10rem'
  },
  sliderRatingStarText: {
    paddingLeft: '4rem',
    color: Colors.white,
    fontSize: '10rem',
    lineHeight: '15rem',
    ...Fonts.style.textInputText
  },
  carouselSliderContainer: {
    height: '250rem'
  },
  carouselSliderPagination: {
    position: 'absolute',
    width: '100%',
    bottom: '-18rem'
  },
  sliderLoacationText: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sliderLocationImg: {
    height: '15.21rem',
    width: '12.6rem'
  }
});

export default styles;
