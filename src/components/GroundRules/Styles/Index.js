import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {marginTop} from 'styled-system';

const styles = EStyleSheet.create({
  listStyle: {
    marginTop: '17rem',
  },
  groundRulesHeading: {
    marginBottom: 0,
  },
  groundRulesHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '13rem',
    paddingBottom: '10rem',
  },
  groundRulesTextContent: {
    paddingBottom: '15rem',
    // borderBottomWidth: 1,
    // borderColor: Colors.gray,
    marginBottom: '10rem',
  },
  groundRulesText: {
    color: Colors.lightBlackText,
    lineHeight: '18rem',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.small,
  },
  groundRulesText2: {
    color: Colors.lightBlackTextOpacity,
    ...Fonts.style.normalText,
  },
  groundRulesMoreBtn: {
    width: '90rem',
  },
  groundRulesMoreText: {
    color: Colors.black,
    lineHeight: '18rem',
    ...Fonts.style.buttonText,
    fontSize: Fonts.size.tiny,
  },
});

export default styles;
