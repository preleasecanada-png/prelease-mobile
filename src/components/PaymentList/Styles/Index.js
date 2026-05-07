import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { borderRadius, height, marginLeft } from 'styled-system';

const styles = EStyleSheet.create({
  activeStyle:{
    borderColor: Colors.green,

  },
  paymentOptionListBtn: {
    flexDirection: 'row',
    borderWidth: '1rem',
    borderColor: Colors.gray,
    marginBottom: '23rem',
    borderRadius: 10,
    height: 70,
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3rem',
  },
  paymentOptionCardImg: {
    width: '35rem',
    height: '35rem',
    marginLeft: '10rem',
  },
  paymentOptionName: {
    color: Colors.black,
    lineHeight: '20rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText,
    marginLeft: '15rem',
  },
  paymentOptionSubName: {
    color: Colors.darkGray,
    marginLeft: '15rem',
    lineHeight: '18rem',
    marginTop: '8rem',
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.textInputText
    },
    '@media android': {
      ...Fonts.style.textInputText
    }
  },
  paymentOptionRightArrowImg: {
    width: '9.78rem',
    height: '16rem',
    marginLeft: 'auto',
    marginRight: '5rem'
  },
  addNewPaymentButtonTextStyle:{
    color: Colors.primary,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
   ...Fonts.style.boldText,
   marginLeft: 10
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
