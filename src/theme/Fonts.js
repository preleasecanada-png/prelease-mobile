import FontHelper from '../helpers/FontHelper';
import { Platform } from 'react-native';
import Colors from '../theme/Colors';

const size = {
  h1: '32rem',
  h2: '28rem',
  h3: '24rem',
  h4: '18rem',
  h5: '16rem',
  larg: '30rem',
  regular: '16rem',
  regularNormal: '20rem',
  medium: '14rem',
  mediumNormal: 14,
  small: '13rem',
  tiny: '12rem',
  xTiny: '10rem',

  
};

const style = {
  placeHolderText: {
    ...FontHelper.font({
      fontFamily: 'Urbanist',
      fontWeight: '300'
    }),
    fontSize: size.regular,
    color: Colors.lightGray
  },
  textInputText: {
    ...FontHelper.font({
      fontFamily: 'Urbanist',
      fontWeight: '500'
    })
  },
  buttonText: {
    ...FontHelper.font({
      fontFamily: 'Urbanist',
      fontWeight: '700'
    })
  },
  lightText: {
    ...FontHelper.font({
      fontFamily: 'Urbanist',
      fontWeight: '300'
    })
  },
  normalText: {
    ...FontHelper.font({
      fontFamily: 'Urbanist',
      fontWeight: '400'
    })
  },
  boldText: {
    ...FontHelper.font({
      fontFamily: 'Urbanist',
      fontWeight: Platform.OS === 'ios' ? '700' : '600'
    })
  }
};

export default {
  size,
  style
};
