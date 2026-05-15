import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {
  borderRadius,
  left,
  marginBottom,
  marginTop,
  overflow,
  width,
} from 'styled-system';

const styles = EStyleSheet.create({
  surface: {
    // backgroundColor: Colors.white,
    height: '40rem',
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 10,
  },
  allInputStyle: {
    backgroundColor: Colors.white,
    height: '40rem',
    // borderTopLeftRadius: '12rem',
    // borderTopRightRadius: '12rem',
    // borderRadius: '12rem',
    paddingVertical: '12rem',
    paddingLeft: '45rem',
    paddingRight: '40rem',
    color: Colors.black,
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
    borderRadius: 50,
    width: '100%',
    // shadowOffset: {
    //   width: '1rem',
    //   height: '1rem'
    // },
    // shadowOpacity: '1rem',
    // shadowRadius: '40rem',
    // elevation: 8,
    // shadowColor: Colors.black,
    // elevation: 5,
  },
  searchIcon: {
    position: 'absolute',
    top: '10rem',
    left: '15.71rem',
    // width: '14rem',
    // height: '14rem',
    tintColor: Colors.black,
  },
});

export default styles;
