import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {
  alignItems,
  backgroundColor,
  marginBottom,
  marginRight,
  position,
  width,
  zIndex,
} from 'styled-system';

const styles = EStyleSheet.create({
  priceMonthHeadingStyle: {
    marginTop: '33rem',
    marginBottom: 0,
  },
  lableContainer: {
    alignItems: 'center',
    padding: 0,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
  },
  lableText: {
    color: Colors.darkGray,
    fontSize: Fonts.size.regular,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  railContainer: {
    flex: 1,
    height: '3rem',
    borderRadius: '2rem',
    backgroundColor: Colors.lightRed,
  },
  railSelectedContainer: {
    height: '3rem',
    backgroundColor: Colors.primary,
    borderRadius: '2rem',
  },
  thumbContainer: {
    width: '30rem',
    height: '30rem',
    borderRadius: '15rem',
    borderWidth: '4rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    backgroundColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: '6rem',
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 20,
    shadowColor: Colors.primary,
  },
  arrowImage: {
    width: '7rem',
    height: '12rem',
  },
  arrowBottomIconStyle: {
    width: '12rem',
    height: '7rem',
  },
  arrowRightIconStyle: {
    height: '12rem',
    width: '7rem',
  },
  rangeSlider: {
    // marginTop: '23rem'
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputTextStyle: {
    height: 50,
    width: '100%',
    color: Colors.black,
    backgroundColor: Colors.white,
    fontSize: Fonts.size.small,
    textAlign: 'center',
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  inputLabelTextStyle: {
    color: Colors.darkGray,
    fontSize: Fonts.size.tiny,
    marginBottom: 8,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  dollarIconStyle: {
    marginRight: 10,
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText,
    position: 'absolute',
    zIndex: 99,
    top: 15,
    left: 20,
  },
});

export default styles;
