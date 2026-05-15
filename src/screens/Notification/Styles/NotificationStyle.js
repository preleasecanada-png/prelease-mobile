import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {
  alignItems,
  alignSelf,
  backgroundColor,
  borderRadius,
  flex,
  flexDirection,
  height,
  justifyContent,
  width,
} from 'styled-system';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    backgroundColor: Colors.white,
  },
  commanHeadingTextStyle: {
    fontSize: Fonts.size.h3,
  },
  notificationLinks: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    // paddingTop: '15rem',
    marginBottom: '13rem',
    alignItems: 'center',
    // paddingHorizontal: '10rem',
    backgroundColor: Colors.white,
    marginVertical: '10rem',
    elevation: 1,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    // margin: '10rem',
  },
  notificationLinkIcon: {
    width: '15rem',
    height: '15rem',
    marginTop: '3rem',
  },
  commanDateTextStyle: {
    alignSelf: 'flex-start',
    color: Colors.black,
    fontSize: Fonts.size.medium,
    marginLeft: '10rem',
    ...Fonts.style.textInputText,
  },
  notificationLinksHeadingPeregraph: {
    flex: 1,
    // borderBottomWidth: '2rem',
    // borderColor: Colors.gray,
    paddingBottom: '15rem',
    paddingHorizontal: '10rem',
    // width: '95%'
    // flex: 0.9

    // marginLeft: '5rem'
  },
  notificationLinksHeading: {
    flexDirection: 'row',
    marginBottom: '6rem',
    // width: '90%',
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationLinksHeadingText: {
    lineHeight: '20rem',
    color: Colors.black,
    fontSize: Fonts.size.regular,
    ...Fonts.style.boldText,
  },
  notificationLinksTimeText: {
    // marginLeft: 'auto',
    lineHeight: '18rem',
    color: Colors.primary,
    fontSize: Fonts.size.xTiny,
    ...Fonts.style.normalText,
  },
  notificationLinksPeregraphText: {
    lineHeight: '21rem',
    color: Colors.darkerGray,
    // width: '100% - 68rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.textInputText,
  },
  notReadMsg: {
    color: Colors.lightRed,
  },
});

export default styles;
