import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../theme';
import {
  backgroundColor,
  borderRadius,
  borderWidth,
  padding,
  zIndex,
} from 'styled-system';

const styles = EStyleSheet.create({
  bottomSheetContent: {
    zIndex: 999,
  },
  profileEditContent: {
    width: '110rem',
    alignSelf: 'center',
    marginBottom: '33rem',
  },
  userEditImageBtn: {
    position: 'absolute',
    right: '8rem',
    bottom: '-10rem',
    padding: 8,
    borderWidth: 0.5,
    borderColor: Colors.lighterBlack,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  profileImage: {
    width: '110rem',
    height: '110rem',
    borderRadius: '110rem',
    borderWidth: 0.5,
    borderColor: Colors.lighterBlack,
  },
  profileInputStyle: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingTop: '8rem',
    paddingBottom: '15rem',
  },
  userEditImage: {
    width: '15rem',
    height: '15rem',
  },
});

export default styles;
