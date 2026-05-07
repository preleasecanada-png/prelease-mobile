import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CircularDatePicker from './CircularDatePicker'
import CommanText from '../../components/SignUpLogIn/CommanText'
import { color } from 'react-native-reanimated'
import { Colors, Fonts } from '../../theme'
import EStyleSheet from 'react-native-extended-stylesheet'
import { marginTop, textAlign } from 'styled-system'
import SearchLayout, { SearchContext } from '../../layouts/SearchLayout'
import { CloseButton } from '../../components/Header/HeadNavbar'
import CommanHeadingScreen from '../../components/CommanHeading'
import CalendarInput from '../../components/SearchScreenComponents/CalendarInput'
import { Content } from '../../components'
import SlideUpPopup from '../../components/Popups/SlideUpPopup'
import { useNavigation } from '@react-navigation/native'

const MonthsSelection = () => {
    return (
        <Component />
    )
};


const Component = () => {
    const { navigate } = useNavigation()
    const [selectedMonth, setSelectedMonth] = React.useState("September 1");
    const [showCalendar, setShowCalendar] = React.useState(false);
    const context = React.useContext(SearchContext);
    const hanldeCloseBottomSheet = () => {
        setShowCalendar(false);
        context.setBottomSheetEnable(false);
        context.setBottomSheetContent(null);
    };




    const handleBottomCalendar = () => {
        navigate("TripSlotCalendar")
        // context.setBottomSheetContent(
        //     <>
        //         <View style={{
        //             // width: '100%',
        //             flexDirection: 'row', alignItems: 'center',
        //             height: 50
        //         }}>
        //             <CloseButton onPress={hanldeCloseBottomSheet} position="absolute" />
        //             <CommanHeadingScreen
        //                 heading={"Chose a start date"}
        //                 headingText
        //                 commanHeadingContainerStyle={{ paddingTop: 0, marginBottom: 0 }}
        //                 commanHeadingTextStyle={styles.bottomSheetHeadingStyle}
        //             />
        //         </View>
        //         <CalendarInput markingType='custom' />
        //     </>
        // );
        // setShowCalendar(true);
        // context.setBottomSheetEnable(true);
    };
    return (
    <View style={{
        height: '80%',
        justifyContent: 'space-around',
    }}>

            <CircularDatePicker />
            <Text
                style={styles.commanTextStyle}
            >
                {`Starting ${selectedMonth}  `}

                <Text
                    style={styles.linkTextStyle}
                    onPress={handleBottomCalendar}
                >
                    {`Edit`}

                </Text>

            </Text>
        </View>

    )
}
export default MonthsSelection

const styles = EStyleSheet.create({
    commanTextStyle: {
        fontSize: Fonts.size.regular,
        // marginVertical: 30,
        color: Colors.black,
        ...Fonts.style.textInputText,
        textAlign: 'center',

    },
    linkTextStyle: {
        color: Colors.primary, textDecorationLine: 'underline',
        ...Fonts.style.boldText,
    },

    bottomSheetHeadingStyle: {
        fontSize: Fonts.size.h4,
        width: "100%", alignSelf: "center",
        textAlign: "center",
    }
    // ...other styles

    // Add your custom styles here if needed. For example:
    // container: {
    //     flex: 1,
    //     backgroundColor: '$white',
    // },
    // text: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    // },
    // ...other styles

    // Add your custom colors here if needed. For example:
    // lightBlue: '#007aff',
    // lightGrey: '#999999',
    // white: '#ffffff',
    //...other colors

    // Add
})