import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';

const styles = EStyleSheet.create({
  cancellationPolicyHeading: {
    marginBottom: 0
  },
  cancellationPolicyHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '13rem',
    paddingBottom: '10rem'
  },
  cancellationPolicyTextContent: {
    paddingBottom: '15rem',
    // borderBottomWidth: 1,
    // borderColor: Colors.gray,
    marginBottom: '10rem'
  },
  cancellationPolicyText: {
    color: Colors.lightBlackText,
    lineHeight: '18rem',
    ...Fonts.style.textInputText,
    fontSize: Fonts.size.small
  },
  cancellationPolicyText2: {
    color: Colors.lightBlackTextOpacity,
    ...Fonts.style.normalText,

  },
  cancellationPolicyMoreBtn: {
    width: '90rem'
  },
  cancellationPolicyMoreText: {
    color: Colors.black,
    lineHeight: '18rem',
    ...Fonts.style.buttonText,
    fontSize: Fonts.size.tiny
  }
});

export default styles;
