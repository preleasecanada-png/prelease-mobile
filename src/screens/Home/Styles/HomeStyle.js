import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { backgroundColor, display, flex, marginTop, overflow, paddingBottom } from 'styled-system';
import { padding } from 'styled-system';
import { borderRadius } from 'styled-system';
import { borderWidth } from 'styled-system';
import { borderColor } from 'styled-system';
import { height } from 'styled-system';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
  },
  searchNotifyContent: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '20rem',
    paddingTop: '13rem',
    // overflow: 'hidden',
  },
  notificationBtn: {
    width: '40rem',
    height: '40rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10rem',
    backgroundColor: Colors.white,
    borderWidth: '1rem',
    borderColor: Colors.lightGray
  },
  notificationIcon: {
    width: '13.59rem',
    height: '16rem'
  },
  searchInputStyle: {
  
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 50
  },
  penddingNotification: {
    position: 'absolute',
    top: '7rem',
    right: '10rem',
    backgroundColor: Colors.primary,
    borderWidth: '2rem',
    borderColor: Colors.white,
    height: '10rem',
    width: '10rem',
    borderRadius: '7.5rem',
    overflow: 'hidden',

  },
  indicatorStyle: {
    width: '6rem',
    height: '6rem',
    backgroundColor: Colors.primary,
    borderRadius: '6rem',
    left: '12%',
    bottom: '5rem',
    display: "none",
  },
  tabBarStyle: {
    backgroundColor: Colors.white,
    marginHorizontal: '20rem',
    elevation: 0,
    shadowOpacity: 0
  },
  labelStyle: {
    color: Colors.darkGray,
    textTransform: 'capitalize',
    margin: 0,
    textAlign: 'center',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.small,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: Colors.gray

  },
  tabStyle: {
    padding: 0,
  },
  tabViewStyle: {
    flex: 1,
    width: '100%',
    marginTop: 15,
    // paddingVertical: 10
  },
  activeLabelStyle: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 0,
  },
  tabBar: {
    // flex: 1,
    borderRadius: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
    // padding: 4,
    height: 60,
    // padding: 6,
    // height: 60,
  },
  tabView: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabItem: {
    // width: 'auto'
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
    justifyContent: "space-evenly",
    // paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    height: 35,
    marginHorizontal: 5,
    // paddingHorizontal: 20,
    // width: "90%"
    // borderTopLeftRadius: BORDERRADIUS,
    // borderBottomLeftRadius: BORDERRADIUS,
  },
  tabItemText: { fontSize: Fonts.size.medium, color: Colors.darkGray, ...Fonts.style.normalText },
});

export default styles;
