import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {alignSelf, border, borderWidth, width} from 'styled-system';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

const styles = EStyleSheet.create({
  facilitiListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    // marginHorizontal: '12rem',
    // alignSelf: 'center',
  },
  facilitiesHeadingStyle: {
    // marginTop: '10rem'
  },
  facilitiListContent: {
    // marginLeft: '-7.5rem',
    // marginRight: '-7.5rem'
  },
  facilitiListCol: {
    width: WINDOW_WIDTH / 4,
    padding: '7.5rem',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: '10rem',
    marginHorizontal: '10rem',
    marginVertical: '5rem',
  },
  facilitiListText: {
    color: Colors.opacityBlackText,
    fontSize: Fonts.size.tiny,
    lineHeight: '15rem',
    textAlign: 'center',
    ...Fonts.style.textInputText,
  },
  facilitiListImg: {
    width: '18rem',
    height: '18rem',
    marginBottom: '6rem',
    tintColor: Colors.primary,
  },
});

export default styles;
