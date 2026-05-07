import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';
import { alignItems, alignSelf, borderRadius, height, marginBottom, marginLeft, width } from 'styled-system';

const styles = EStyleSheet.create({
  bottomSheetContent:{
      flex: 1,
      paddingHorizontal: '15rem',
      backgroundColor: Colors.white,
      elevation: 4,
      shadowColor: Colors.black,
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: '5rem'
      }
      // alignItems: 'center',
  },
  searchSuggestions: {
    width: '100%',
    paddingHorizontal: '20rem',
    height: '100% - 138rem',
    paddingBottom: '35rem',
    backgroundColor: Colors.white,
  },
  searchInputStyle: {
    marginHorizontal: 'auto',
    width: '100% - 40rem',
    // marginBottom: '33rem'
  },
  mapStyle: {
    width: '100%',
    height: '100%'
  },
  suggestionsList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '15rem',
    marginBottom: '23rem',
    // borderBottomWidth: '2rem',
    borderColor: Colors.white,
    paddingHorizontal: '3rem'
  },
  suggestionsSearchIcon: {
    width: '14rem',
    height: '14rem'
  },
  suggestionsSearchText: {
    paddingLeft: '18rem',
    lineHeight: '24rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText
  },
  suggestionsListContainer: {
    marginBottom: '-23rem'
  },
  locationIconView:{
    width: '34rem',
    height: '34rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: '7rem'

  },
  locationIcon:{
    tintColor: Colors.black,
    width: '25rem',
    height: '25rem'
  },
  locationText:{
    paddingVertical: '10rem',
    color: Colors.darkerGray,
    fontSize: Fonts.size.medium,
   ...Fonts.style.boldText,
   marginLeft: '10rem',

  },
  locationSubText:{
    color: Colors.black,

  },
  flexRow:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  editIcon:{
    tintColor: Colors.primary,
    width: '20rem',
    height: '20rem',
    marginLeft: 'auto',
  },
  btnStyle:{
    borderRadius: 50,
    marginBottom: 'auto',
  }

});

export default styles;
