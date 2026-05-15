import EStyleSheet from 'react-native-extended-stylesheet';
import {justifyContent} from 'styled-system';
import {Colors, Fonts} from '../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
  },
  profileEditContent: {
    backgroundColor: Colors.lightWhite,
    borderRadius: '12rem',
    paddingVertical: '13rem',
    paddingLeft: '15rem',
    paddingRight: '22rem',
    marginBottom: '13rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImageContent: {
    width: '44rem',
    height: '44rem',
    backgroundColor: '#FDE7E7',
    borderRadius: '40rem',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userNameEmailText: {
    paddingLeft: '12rem',
  },
  userNameText: {
    color: Colors.darkGray,
    lineHeight: '24rem',
    fontSize: Fonts.size.regular,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  userEmailText: {
    color: Colors.primary,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  userEditIcon: {
    // marginLeft: 'auto'
  },
  userEditImage: {
    width: '15rem',
    height: '15rem',
  },
  profileLinkList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '15rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
  },
  profileLinkText: {
    lineHeight: '21rem',
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  profileLinkImg: {
    marginLeft: 'auto',
    width: '14rem',
    height: '14rem',
  },
  profileLinkListContent: {
    paddingHorizontal: '20rem',
  },
});

export default styles;
