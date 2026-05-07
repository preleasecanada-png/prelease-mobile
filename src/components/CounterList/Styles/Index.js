import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { border, borderWidth, flex, marginLeft, padding } from 'styled-system';

const styles = EStyleSheet.create({
  facilitiCounterContainer:{

    flex: 1,
  },
  facilitiCounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
    paddingVertical: '10rem'
  },
  textContainer:{
    marginRight: 'auto',
  },
  facilitiCounterHeading: {
    color: Colors.black,
    lineHeight: '24rem',
    // marginRight: 'auto',
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText
  },
  facilitiCounterDesc:{
    color: Colors.gratLightText,
    lineHeight: '24rem',
    // marginRight: 'auto',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText
    
  },
  facilitiCounterBtnsTextRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  facilitiCounterText: {
    paddingHorizontal: '8rem',
    color: Colors.gratLightText,
    lineHeight: '24rem',
    fontSize: Fonts.size.regular,
    ...Fonts.style.boldText
  },
  facilitiCounterPluseMinsaIcon: {
    width: '14rem',
    height: '14rem'
  },
  facilitiCounterPresable:{
    borderWidth: '1rem',
    borderColor: Colors.primary,
    borderRadius: 50,
    padding: 5,
    marginLeft: 'auto',
  },
  incrementStyle:{
    backgroundColor: Colors.primaryLight
  }
});

export default styles;
