import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../theme';
import {
  alignItems,
  borderRadius,
  bottom,
  flex,
  justifyContent,
} from 'styled-system';

const styles = EStyleSheet.create({
  inputView: {
    flex: 1,
    justifyContent: 'center',
  },
  profileInputStyle: {
    borderRadius: 8,
    color: Colors.inputGreyColor,
  },
  inputLabelText: {
    textAlign: 'left',
    color: Colors.darkGray,
  },
  datePickerIconStyle: {
    width: '13.6rem',
    height: '15rem',
    position: 'absolute',
    top: '15rem',
    // bottom: '8rem',
    right: '10rem',
  },
});

export default styles;
