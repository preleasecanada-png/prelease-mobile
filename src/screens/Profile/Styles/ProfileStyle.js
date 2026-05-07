import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { borderRadius, justifyContent, lineHeight, marginBottom, marginLeft, marginRight, marginTop, paddingBottom, paddingTop } from 'styled-system';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '0rem',
    backgroundColor: Colors.white
  },
  cardContainer:{
    backgroundColor: Colors.white,
    marginTop: '10rem',
    paddingBottom: '0rem',
    marginTop: 20
  },
  commanHeadingContainerStyle:{
    marginBottom: 0
  },
  commanHeadingTextStyle: {
    fontSize: Fonts.size.h3,
    lineHeight: 30
  },
  
  profileEditContent: {
    // backgroundColor: Colors.lightWhite,
    borderRadius: '12rem',
    paddingVertical: '13rem',
    paddingLeft: '15rem',
    paddingRight: '22rem',
    marginBottom: '10rem',
    flexDirection: 'row',
    // justifyContent:"space-between",
    alignItems: 'center'
  },
  editProfileBtn:{
    borderRadius: 50,
    marginHorizontal: 15,
    padding: 6,
    marginTop: 10,

  },
  editProfileIcon:{
    width: '20rem',
    height: '20rem',
    
  },
  profileImageContent: {
    width: '60rem',
    height: '60rem',
    backgroundColor: '#FDE7E7',
    borderRadius: '40rem'
  },
  profileImage: {
    width: '100%',
    height: '100%'
  },
  userNameEmailText: {
    paddingLeft: '12rem'
  },
  userNameText: {
    color: Colors.black,
    lineHeight: '24rem',
    fontSize: Fonts.size.regularNormal,
    '@media ios': {
      ...Fonts.style.textInputText
    },
    '@media android': {
      ...Fonts.style.buttonText
    }
  },
  designation: {
    color: Colors.lightGrayText,
    lineHeight: '18rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.textInputText

  },
  userEmailText: {
    color: Colors.opacityBlackText,
    lineHeight: '18rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.textInputText,
    marginLeft: 10
  },
  userEditIcon: {
    marginLeft: 'auto'
  },
  userEditImage: {
    width: '15rem',
    height: '15rem',

  },
  profileLinkList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '15rem',
    borderBottomWidth: '1rem',
    borderColor: Colors.boxShadowLighterBlack
  },
  profileLinkText: {
    lineHeight: '21rem',
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText,
    marginLeft: '10rem'
  },
  profileLinkImg: {
    // marginLeft: 'auto',
    width: '18rem',
    height: '18rem',
    tintColor: Colors.black
  },
  rightArrowIcon: {
    marginLeft: 'auto',
    width: '15rem',
    height: '15rem',
    tintColor: Colors.black

  },
  profileLinkListContent: {
    paddingHorizontal: '20rem'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '20rem',
    paddingBottom: 10
  }
});

export default styles;
