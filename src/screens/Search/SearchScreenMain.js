import * as React from 'react';
import SearchLocation from '../../components/SearchScreenComponents/SearchLocation';
import WhoIsComing from '../../components/SearchScreenComponents/WhoIsComing';
import EStyleSheet from 'react-native-extended-stylesheet';
import SearchLayout from '../../layouts/SearchLayout';
import CommonListItemCard from '../../components/CommonListItemCard';
import CalendarSelector from '../../components/SearchScreenComponents/CalendarSelector';
import CommonPopup from '../../components/Popups/CommonPopup';
import TripSlotSelection from './TripSlotSelection';
import WhereTo from '../../components/SearchScreenComponents/WhereTo';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { Pressable, View } from 'react-native';
import { Container, Content } from '../../components';
import { TouchableOpacity } from 'react-native';
import { FeatherIcon } from '../../theme/icons';
import CommanBtnScreen from '../../components/CommanBtn';
import { Colors, Fonts } from '../../theme';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { categoryListData2 } from '../../assets/data';

function SearchScreenMain({ navigation }) {

  const navigateTo = (route, params) => navigation.navigate(route, params);
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [hideButtons, setHideButtons] = React.useState(false);
  const [expanded, setExpanded] = React.useState([
    true,
    false,
    false,
  ]);
  const item = categoryListData2[0];
  const renderButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <CommanBtnScreen
          btnText="Clear All"
          commanBtnStyle={[styles.btnStyle, { backgroundColor: Colors.transparent, }]}
          commanBtnTextStyle={styles.cancelButtonTextStyle}

          onBtnPress={() => { }}
        />
        <TouchableOpacity
          onPress={() => navigateTo("SearchLocation", {
            item
          })}
          style={[styles.btnStyle, styles.flexRow, styles.btnStyle2]}>
          <FeatherIcon name='search' size={18} color={Colors.white} />
          <Text style={styles.commanBtnText}>Search</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleClose = React.useCallback((expanded, index) => {
    setExpanded((prevExpanded) =>
      prevExpanded.map((item, i) => i === index ? expanded : item)
    );
  }, [setExpanded, expanded]);

  // console.log("expanded", expanded)

  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        {/* <SearchLayout hideButtons={hideButtons}> */}
        {/* <SearchLocation
          leftText={"Where"}
          rightText="St. Lawrence Market, Toronto"
          navigateTo={() => navigateTo("WhereTo")}
        /> */}
        <CommonListItemCard
          contentTitle={"Where To?"}
          leftText={"Where"}
          rightText="St. Lawrence Market, Toronto"
          navigateTo={() => navigateTo("WhereTo")}
          content={<WhereTo />}
          onPress={() => setHideButtons(!hideButtons)}
          handleClose={(expanded) => handleClose(expanded, 0)}

        />

        {/* <VerticalTabs /> */}
        {/* <TouchableWithoutFeedback onPress={()=>console.log("TouchableWithoutFeedback")}> */}
        <CommonListItemCard
          // expanded={expanded[1]}
          handleClose={(expanded) => handleClose(expanded, 1)}
          leftText={"When"}
          rightText="Sep 11 - Feb 11 "
          contentTitle="When’s your trip?"
          content={<TripSlotSelection />}
          navigateTo={() => navigateTo("TripSlotSelection")}
          animatedHeight={WINDOW_HEIGHT * 0.8 - (WINDOW_HEIGHT * 0.02)}

          onPress={() => setHideButtons(!hideButtons)}
        />
        {/* </TouchableWithoutFeedback> */}

        <CommonListItemCard

          handleClose={(expanded) => handleClose(expanded, 2)}
          // expanded={expanded[2]}
          leftText={"Who"}
          rightText="Add Guests"
          contentTitle="Who's coming?"
          content={<WhoIsComing />}
          navigateTo={() => navigateTo("TripSlotSelection")}
          animatedHeight={WINDOW_HEIGHT * 0.8 - (WINDOW_HEIGHT * 0.09 + WINDOW_HEIGHT * 0.09)}
          onPress={() => setHideButtons(!hideButtons)}
        />

        {openCalendar &&
          <CommonPopup>
            <CalendarSelector />
          </CommonPopup>
        }
      </Content>



      {(!expanded[0] || expanded[1] || !expanded[2]) && renderButtons()}
    </Container>
  );
};



const styles = EStyleSheet.create({
  container: {
    paddingTop: 15,
    // paddingBottom: '15rem',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: '10rem'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: "center"
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
});

export default SearchScreenMain;
