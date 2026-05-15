/**
 * Helper class for font
 */
import _ from 'lodash';
import {Platform} from 'react-native';
// use post script names for font families
const Urbanist = {
  100: {
    fontFamily: Platform.OS === 'android' ? 'Urbanist-Light' : 'Urbanist-Light',
  },
  200: {
    fontFamily: Platform.OS === 'android' ? 'Urbanist-Light' : 'Urbanist-Light',
  },
  300: {
    fontFamily: Platform.OS === 'android' ? 'Urbanist-Light' : 'Urbanist-Light',
  },
  400: {
    fontFamily:
      Platform.OS === 'android' ? 'Urbanist-Regular' : 'Urbanist-Regular',
  },
  500: {
    fontFamily: 'Urbanist-Medium',
  },
  600: {
    fontFamily: Platform.OS === 'android' ? 'Urbanist-Bold' : 'Urbanist-Bold',
  },
  700: {
    fontFamily: Platform.OS === 'android' ? 'Urbanist-Bold' : 'Urbanist-Bold',
  },
  800: {
    fontFamily: Platform.OS === 'android' ? 'Urbanist-Bold' : 'Urbanist-Bold',
  },
};

const FONTS = {
  Urbanist,
};

/**
 * Helper class for cross-platform font styles
 */
class FontHelper {
  static font(fontParams) {
    const fontFamily = fontParams.fontFamily || 'Urbanist';
    const fontWeight = fontParams.fontWeight || '400';
    const fontStyle = fontParams.fontStyle || '';

    return {
      ..._.omit(fontParams, [fontFamily, fontFamily, fontStyle]),
      ...FONTS[fontFamily][fontWeight + fontStyle],
    };
  }
}

export default FontHelper;
