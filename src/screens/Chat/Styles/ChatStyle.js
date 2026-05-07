import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { isIphoneX } from '../../../libs/Utils';
import { backgroundColor, borderRadius, borderWidth, marginBottom, marginLeft, marginRight, padding, paddingTop, position, right } from 'styled-system';
import { color } from 'react-native-reanimated';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    backgroundColor: Colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: '15rem',
    // borderBottomWidth: '2rem',
    // borderColor: Colors.gray,
  },
  commanHeadingTextStyle:{
    fontSize: Fonts.size.h3,

  },
  tabButton: {
    // flex: 1,
    // paddingHorizontal: '20rem',
    borderWidth: isIphoneX ? 1 : 0,
    borderColor: Colors.opacityBlack_50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 5,


  },
  activedtabButton:{
    backgroundColor: Colors.primary,


  },
  activetabButtonText:{
    color: Colors.white,

  },
  searchButton:{
    paddingHorizontal: '20rem',
    borderWidth: isIphoneX ? 1 : 0,
    borderColor: Colors.opacityBlack_50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    // marginRight: 5,
    marginLeft: 'auto',

  },
  tabButtonText: {
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    '@media ios': {
      ...Fonts.style.textInputText
    },
    '@media android': {
      ...Fonts.style.textInputText
    },
    color: Colors.opacityBlackText

  },
  onlineStatus: {
    position: 'absolute',
    bottom: '3rem',
    right: '3rem',
    backgroundColor: Colors.green,
    color: Colors.white,
    paddingHorizontal: '5rem',
    paddingVertical: '5rem',
    borderRadius: '10rem',
    fontSize: Fonts.size.tiny,
    fontWeight: 'bold',
    '@media ios': {
      ...Fonts.style.textInputText
    },
    '@media android': {
      ...Fonts.style.textInputText
    },

  },
  searchInputStyle: {
    width: '100% - 40rem',
    marginBottom: '23rem'
  },
  chatListLink: {
    paddingHorizontal: '20rem',
    paddingTop: '14rem',
    paddingBottom: '14rem',
    // marginTop: '17rem',
    // borderBottomWidth: '2rem',
    // borderColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center'
  },
  unReadChatItem: {
    backgroundColor: 'rgba(217,217,217,0.3)'

  },
  chatListDateText: {
    color: '#999',
    fontSize: 12,
    marginLeft: 'auto'
  },
  unreadChatListDateText: {
    color: Colors.primary

  },
  chatText: {
    color: '#666',
    fontSize: 14,
    marginTop: 2
  },
  chatListUserImg: {
    width: 54,
    height: 54,
    borderRadius: 27
  },
  chatListLinkText: {
    paddingLeft: 15,
    flex: 1,
    justifyContent: 'center'
  },
  chatListLinkNameText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  chatListLinkLastSeenText: {
    lineHeight: '18rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.normalText
    },
    '@media android': {
      ...Fonts.style.normalText
    }
  },
  pageContent: {
    paddingVertical: '10rem',
    paddingHorizontal: '6rem',
    flex: 1,
    width: '100%'
  },
  chatDetailContent: {
    backgroundColor: Colors.white,
    marginTop: '-10rem',
    borderRadius: '6rem',
    padding: '10rem',
    paddingTop: '6rem',
    marginBottom: '10rem'
  },
  chatDetailText: {
    flexDirection: 'row',
    paddingTop: '4rem'
  },
  msgBg: {
    backgroundColor: Colors.white,
    borderTopStartRadius: '12rem',
    borderTopEndRadius: '12rem',
    borderBottomEndRadius: '12rem',
    borderBottomStartRadius: 0,
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
    overflow: 'hidden',
    maxWidth: '335rem',
    width: '100%',
    padding: '10rem'
  },
  replayMsgBg: {
    backgroundColor: Colors.lighterGray,
    borderLeftWidth: '4rem',
    borderColor: Colors.primary,
    padding: '8rem',
    borderTopLeftRadius: '4rem',
    borderTopEndRadius: '12rem',
    borderBottomLeftRadius: '4rem',
    borderBottomEndRadius: '12rem'
  },
  replayMsgUserName: {
    fontSize: '10rem',
    lineHeight: '15rem',
    color: Colors.primary,
    '@media ios': {
      ...Fonts.style.textInputText
    },
    '@media android': {
      ...Fonts.style.buttonText
    }
  },
  replayMsgUserText: {
    lineHeight: '21rem',
    color: Colors.black,
    marginTop: '4rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText
  },
  messageText: {
    marginVertical: '4rem',
    color: Colors.black,
    lineHeight: '21rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText
  },
  messageTimeText: {
    fontSize: '10rem',
    lineHeight: '15rem',
    color: Colors.darkerGray,
    ...Fonts.style.normalText
  },
  msgSeenText: {
    color: Colors.white,
    fontSize: '10rem',
    lineHeight: '15rem',
    paddingRight: '10rem',
    ...Fonts.style.normalText
  },
  chatInputContainerStyle: {
    borderWidth: 0,
    borderTopWidth: 0,
    position: 'relative',
    borderRadius: '25rem',
    paddingLeft: '0rem',
    lineHeight: '15rem',
    paddingRight: '80rem',
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText
  },
  inputBorderView: {
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
    height: '100%',
    position: 'absolute',
    width: '100% - 95rem',
    top: '22rem',
    left: '15rem',
    borderRadius: '25rem'
  },
  chatInputBgContainerStyle: {
    backgroundColor: Colors.white,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    shadowColor: Colors.boxShadowLighterBlack
  },
  chatSendBtnContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -85,
    marginLeft: 20,
    top: -3,
    borderRadius: 20
  },
  chatSendBtnImg: {
    width: 18,
    height: 18
  },
  chatContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  dateRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    marginBottom: 10
  },
  dateRowLins: {
    height: 1,
    width: '100%',
    flex: 1,
    backgroundColor: Colors.gray
  },
  dateRowLeftLine: {
    marginLeft: 20
  },
  dateRowRightLine: {
    marginRight: 20
  },
  dateTextStyle: {
    color: Colors.darkerGray,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.lightText
  },
  dateTextContainerStyle: {
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: 16
  },
  chatMsgTimeText: {
    fontSize: 10,
    lineHeight: 15,
    ...Fonts.style.normalText
  },
  bubbleTextStyle: {
    padding: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    ...Fonts.style.normalText
  },
  textInputStyle: {
    color: Colors.black,
    paddingTop: '8rem',
    ...Fonts.style.normalText
  }
});

export default styles;
