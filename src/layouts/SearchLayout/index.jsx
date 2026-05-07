import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Container, Content } from '../../components'
import EStyleSheet from 'react-native-extended-stylesheet'
import CommanBtnScreen from '../../components/CommanBtn'
import { TouchableOpacity } from 'react-native'
import { FeatherIcon } from '../../theme/icons'
import { Colors, Fonts } from '../../theme'
import CommonBottomSheet from '../../components/CommonBottomSheet'
import CalendarListScreen from '../../components/SearchScreenComponents/CalendarListScreen'
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet'
import CalendarInput from '../../components/SearchScreenComponents/CalendarInput'
import CommanHeadingScreen from '../../components/CommanHeading'
import { alignItems, alignSelf, justifyContent, paddingTop, textAlign, width } from 'styled-system'
import { CloseButton } from '../../components/Header/HeadNavbar'
import SlideUpPopup from '../../components/Popups/SlideUpPopup'

export const SearchContext = React.createContext();
const SearchLayout = ({ children, hideButtons = false }) => {
  const [bottomSheetEnable, setBottomSheetEnable] = React.useState(false)
  const [bottomSheetContent, setBottomSheetContent] = React.useState(null);
  const renderButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <CommanBtnScreen
          btnText="Clear All"
          commanBtnStyle={[styles.btnStyle, { backgroundColor: Colors.transparent, }]}
          commanBtnTextStyle={styles.cancelButtonTextStyle}

          onBtnPress={() => navigation.navigate('AddPaymentMathod')}
        />
        <TouchableOpacity style={[styles.btnStyle, styles.flexRow, styles.btnStyle2]}>
          <FeatherIcon name='search' size={18} color={Colors.white} />
          <Text style={styles.commanBtnText}>Search</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const hanldeCloseBottomSheet = React.useCallback(() => {
    setBottomSheetEnable(false);
    setBottomSheetContent(null);
  }, [])
  return (
    <SearchContext.Provider value={{
      bottomSheetEnable, setBottomSheetEnable,
      setBottomSheetContent
    }}>
      <Container>
        <Content contentContainerStyle={styles.container}>
          {children}
        </Content>

        {!hideButtons && renderButtons()}
        {/* {bottomSheetEnable &&
          <CommonBottomSheet
            hideButton snapPoints={[WINDOW_HEIGHT - 100, WINDOW_HEIGHT - 100]}
          >
            {bottomSheetContent}
          </CommonBottomSheet>

          
        } */}

      </Container>
      {bottomSheetEnable &&
        <SlideUpPopup
          visible={bottomSheetEnable}
          onClose={hanldeCloseBottomSheet}>
          {bottomSheetContent}
        </SlideUpPopup>
      }
    </SearchContext.Provider>
  )
}

export default SearchLayout

const styles = EStyleSheet.create({
  container: {
    paddingTop: 15,
    // paddingBottom: '15rem',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: '10rem'
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20, paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 'auto',
  },
  btnStyle: {
    borderRadius: 50,
    width: 120
  },
  btnStyle2: {
    borderRadius: 50,
    backgroundColor: Colors.primary,
    padding: '12rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem'
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonTextStyle: {
    color: Colors.black,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText

  },

  commanBtnText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText,

    marginLeft: 11
  },
})