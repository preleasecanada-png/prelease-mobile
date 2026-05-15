import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  commanBtn: {
    backgroundColor: Colors.primary,
    padding: '12rem',
    borderRadius: '12rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commanBtnText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    ...Fonts.style.boldText,
  },
  commanBtnIcon: {
    marginLeft: '12rem',
  },
});

export default styles;
