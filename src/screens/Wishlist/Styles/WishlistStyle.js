import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {fontSize, marginBottom} from 'styled-system';

const styles = EStyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: '20rem',
    backgroundColor: Colors.white,
  },
  categoryPropartyImgStyle: {
    width: '95rem',
    height: '95rem',
  },
  categoryRightContentStyle: {
    width: '100% - 177rem',
  },
  clearAllTextStyle: {
    // underline
    textDecorationLine: 'underline',
    fontSize: Fonts.size.mediumNormal,
    color: Colors.black,
  },
  commanHeadingTextStyle: {
    fontSize: Fonts.size.h3,
  },
  commanHeadingContainerStyle: {
    marginBottom: 0,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '15rem',
  },
});

export default styles;
