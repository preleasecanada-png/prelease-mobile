import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
import {isIphoneX} from '../../../libs/Utils';
import {Colors, Fonts} from '../../../theme';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  backgroundColor,
  borderRadius,
  borderWidth,
  flex,
  marginLeft,
  marginTop,
  overflow,
  padding,
} from 'styled-system';
import {color} from 'react-native-reanimated';
const windowWidth = Dimensions.get('window').width;

const statusBarHeight = getStatusBarHeight();

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '90rem',
    backgroundColor: Colors.white,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularDetailsHeader: {
    backgroundColor: Colors.transparent,
    position: 'absolute',
    // marginTop: statusBarHeight
  },
  popularDetailsMainImg: {
    width: '100%',
    height: '375rem',
  },
  propertyDetaileImgContentStyle: {
    width: '100%',
    height: '375rem',
    borderRadius: 0,
    marginBottom: '20rem',
  },
  propertyDetaileContentStyle: {
    paddingHorizontal: '15rem',
  },
  propertyDetaileContainer: {
    paddingHorizontal: '15rem',
    marginTop: '13rem',
  },
  facilitiesHeadingStyle: {
    // marginTop: '13rem'
  },
  propertyDetaileImgsRow: {
    marginLeft: '-4.5rem',
    paddingLeft: '20rem',
  },
  propertyDetaileImgs: {
    width: '99rem',
    height: '91rem',
    borderRadius: '10.1rem',
    marginHorizontal: '4.5rem',
  },
  photoHeadingStyle: {
    marginTop: '25.5rem',
  },
  propertyDetailePhotoRow: {
    marginBottom: '33rem',
  },
  propertyDetaileLocationTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '15rem',
  },
  propertyDetaileLocationImg: {
    width: '14rem',
    height: '16.9rem',
    marginRight: '6rem',
  },
  propertyDetaileLocationText: {
    lineHeight: '21rem',
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  propertyDetaileMap: {
    marginBottom: '33rem',
  },
  propertyDetaileMapImg: {
    width: '100%',
    height: '218rem',
  },
  ratingContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingHorizontal: '3rem',
    paddingVertical: '3rem',
  },
  propertyDetaileRatingStarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '13rem',
  },
  propertyDetaileRatingStarText: {
    lineHeight: '38rem',
    color: Colors.black,
    marginRight: '13rem',
    fontSize: Fonts.size.larg,
    ...Fonts.style.buttonText,
  },
  propertyDetaileRatingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '-2rem',
  },
  propertyDetaileRatingStarImg: {
    width: '14rem',
    height: '14rem',
    marginHorizontal: '2rem',
  },
  ratingCategoryListRow: {
    marginBottom: '10rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCategoryListHeading: {
    marginRight: '23rem',
    lineHeight: '21rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  ratingCategoryBgLine: {
    width: '100% - 131rem',
    height: '6rem',
    backgroundColor: Colors.lightRed,
    borderRadius: '6rem',
    marginLeft: 'auto',
  },
  ratingCategoryFillLine: {
    width: '100%',
    height: '6rem',
    backgroundColor: Colors.primary,
    borderRadius: '6rem',
  },
  reviewsHeadingStyle: {
    // marginTop: '13rem'
  },
  surface: {
    width: '100%',
    backgroundColor: Colors.white,

    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: Colors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2.0,
    borderRadius: 10,
    // overflow: 'hidden',
    elevation: 1,
  },
  reviewContent: {
    borderRadius: 10,
    // marginBottom: '23rem',
    padding: 8,
  },

  reviewUserImgText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '7rem',
  },
  reviewsUserImage: {
    width: '40rem',
    height: '40rem',
    borderRadius: '50rem',
  },
  reviewUserRightText: {
    paddingLeft: '12rem',
    // backgroundColor: Colors.primary,
    flex: 1,
  },
  reviewUserNameText: {
    marginBottom: '3rem',
    lineHeight: '21rem',
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText,
  },
  reviewUserDateText: {
    color: Colors.opacityBlackText,
    fontSize: Fonts.size.tiny,
  },
  reviewUserTimeText: {
    marginLeft: 10,
    color: Colors.opacityBlackText,
    fontSize: Fonts.size.tiny,
  },
  reviewRatingStarTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  reviewRatingText: {
    color: Colors.black,
    marginRight: '11rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.buttonText,
  },
  reviewRatingStarRow: {
    marginHorizontal: '-2rem',
  },
  reviewRatingStarParegraph: {
    lineHeight: '21rem',
    color: Colors.opacityBlackText,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  readMoreLessText: {
    lineHeight: '21rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  bookNowBtnContentStyle: {
    paddingBottom: isIphoneX() ? '30rem' : '20rem',
    bottom: 0,
  },
  mapStyle: {
    width: '100%',
    height: '218rem',
  },
  bookNowBtnContent: {
    backgroundColor: Colors.white,
    paddingHorizontal: '20rem',
    paddingVertical: '10rem',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: windowWidth,
    bottom: isIphoneX() ? '30rem' : 0,
    left: 0,
    '@media ios': {
      paddingBottom: '30rem',
      bottom: 0,
    },
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderTopL:10,
    // borderTopR:10,
    // bortopL:10,
    // bortopR:10,
    // borderTopRadius
    elevation: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  bookNowBtn: {
    width: '150rem',
    marginLeft: 'auto',
    borderRadius: 50,
  },
  bookNowBtnText: {
    textTransform: 'uppercase',
  },
  bookNowBtnPriceTexts: {
    // marginLeft: 'auto'
  },
  bookNowBtnPriceText: {
    color: Colors.black,
    lineHeight: '20rem',
    textAlign: 'right',
    marginBottom: '6rem',
    fontSize: Fonts.size.h5,
    ...Fonts.style.boldText,
    letterSpacing: '0.5rem',
  },
  bookNowBtnPricePerText: {
    color: Colors.darkGray,
    lineHeight: '21rem',
    textAlign: 'right',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  confirmPayBtn: {
    width: '196rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bookHistoryContainer: {
    paddingHorizontal: '20rem',
  },
  morBtnStyle: {
    color: Colors.black,
    lineHeight: '21rem',
    textAlign: 'right',
    fontSize: Fonts.size.small,
    ...Fonts.style.normalText,
  },
  seeMoreButttonStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.boxShadowLighterBlack,
    borderWidth: 0.5,
    borderRadius: 50,
    marginVertical: 10,
    marginHorizontal: '15rem',
    // overflow: 'hidden',
    paddingVertical: 10,
  },
  seeMoreButttonTextStyle: {
    color: Colors.opacityBlackText,
  },
  feedbackButttonTextStyle: {
    color: Colors.primary,
  },
});

export default styles;
