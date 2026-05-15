import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {Dimensions} from 'react-native';
import {
  alignItems,
  alignSelf,
  backgroundColor,
  borderRadius,
  bottom,
  flexDirection,
  justifyContent,
} from 'styled-system';
const {width, height} = Dimensions.get('window');

const styles = EStyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
  },
  stepper: {
    backgroundColor: Colors.gray,
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  nextStartBtn: {
    paddingHorizontal: '12rem',
    paddingVertical: '14rem',
    color: Colors.white,
    color: Colors.white,
    fontSize: Fonts.size.medium,
  },
  nextFirstStartBtnView: {
    marginLeft: 'auto',
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '50rem',
    height: '50rem',
    alignSelf: 'flex-end',
  },
  nextStartBtnView: {
    backgroundColor: Colors.primary,
    borderRadius: '50rem',
    marginLeft: 'auto',
    // marginRight: 'auto',
    width: '165rem',
    height: '50rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink,
  },
  backBtnImgView: {
    width: '50rem',
    height: '50rem',
    borderRadius: '12rem',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: '1rem',
      height: '10rem',
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurBlack,
  },
  backBtnImg: {
    width: '9.78rem',
    height: '16rem',
  },
  welcomeBottomBtn: {
    paddingHorizontal: '25rem',
    flexDirection: 'row',
    marginBottom: '10rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  welcomeTwoSlideImg: {
    height: '307rem',
  },

  skip: {
    color: Colors.black,
    fontSize: Fonts.size.small,
    marginLeft: 'auto',
    marginTop: '10rem',
    textDecorationLine: 'underline',
    marginRight: 10,
  },
});

export default styles;
