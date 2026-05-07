import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CloseButton } from '../../components/Header/HeadNavbar'
import CommanHeadingScreen from '../../components/CommanHeading'
import CalendarInput from '../../components/SearchScreenComponents/CalendarInput'
import SlideUpPopup from '../../components/Popups/SlideUpPopup'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, Fonts } from '../../theme'
import { Container, Content } from '../../components'
import { backgroundColor, height, marginBottom } from 'styled-system'
import CommanBtnScreen from '../../components/CommanBtn'
import LineSeperator from '../../components/LineSeperator'

const TripSlotCalendar = ({ navigation }) => {
    const [showCalendar, setShowCalendar] = React.useState(true);
    const hanldeCloseBottomSheet = () => {
        setShowCalendar(false);
        navigation.goBack()
    };

    // const handleBottomCalendar = () => {
    //     setShowCalendar(true);
    // }

    return (
        <Container conatinerStyle={{
            flex: 1,
            backgroundColor: Colors.opacityBlack
        }}>
            <SlideUpPopup
                visible={showCalendar}
                onClose={hanldeCloseBottomSheet}

            >
                <View style={styles.conatinerStyle}>
                    <View style={{
                        // width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50
                    }}>
                        <CloseButton onPress={hanldeCloseBottomSheet} position="absolute" />
                        <CommanHeadingScreen
                            heading={"Chose a start date"}
                            headingText
                            commanHeadingContainerStyle={{ paddingTop: 0, marginBottom: 0 }}
                            commanHeadingTextStyle={styles.bottomSheetHeadingStyle}
                        />
                    </View>
                    <View style={{ height: "70%" }}>
                        <CalendarInput markingType='custom' />
                    </View>
                    {/* <LineSeperator style={styles.lineSeperatorStyle} /> */}
                    <CommanBtnScreen
                        commanBtnStyle={styles.commanBtnStyle}
                        btnText={"Apply"}
                        onBtnPress={hanldeCloseBottomSheet}
                    />
                </View>
            </SlideUpPopup>
        </Container>
    )
}

export default TripSlotCalendar

const styles = EStyleSheet.create({
    conatinerStyle: {
        flex: 1,
        height: '100%',
        // backgroundColor: Colors.darkGray2,

    },
    lineSeperatorStyle: {
        backgroundColor: Colors.darkGray2,
        height: 1,
        // marginBottom: 20

    },
    commanBtnStyle: {
        marginBottom: 'auto',
        marginHorizontal: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.darkGray2,
        marginVertical: 10
    },
    bottomSheetHeadingStyle: {
        fontSize: Fonts.size.h4,
        width: "100%", alignSelf: "center",
        textAlign: "center",
    }
})