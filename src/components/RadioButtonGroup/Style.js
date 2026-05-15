import EStyleSheet from 'react-native-extended-stylesheet';
import {flex, marginBottom} from 'styled-system';
import {isIphoneX} from '../../libs/Utils';
import {Colors, Fonts} from '../../theme';

const styles = EStyleSheet.create({
  radioButtonGroup: {
    // flex: 1,
    marginBottom: '10rem',
  },
  container: {
    flex: 1,
    // paddingHorizontal: '10rem',
    marginVertical: '10rem',
    // borderBottomWidth: '2rem',
    // borderColor: Colors.gray,
    marginBottom: '20rem',
  },

  radioButtonGroup: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // marginBottom: 20,
    // borderBottomWidth: '2rem',
    // borderColor: Colors.gray,
  },
  buttonGroupItem: {
    // flex: 1,
    // paddingHorizontal: '20rem',
    borderWidth: isIphoneX ? 1 : 0,
    borderColor: Colors.lightGrayText,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activedtabButton: {
    backgroundColor: Colors.primary,
  },
  radioButtonText: {
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
    color: Colors.opacityBlackText,
  },
  activeradioButtonText: {
    color: Colors.white,
  },
});

export default styles;
