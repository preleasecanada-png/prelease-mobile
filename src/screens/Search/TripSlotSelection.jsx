import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CalendarListScreen from '../../components/SearchScreenComponents/CalendarListScreen';
import { TouchableOpacity } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { Colors, Fonts } from '../../theme';
import { Card } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontSize, marginTop } from 'styled-system';
import CommanHeadingScreen from '../../components/CommanHeading';
import CommonListItemCard from '../../components/CommonListItemCard';
import { useNavigation } from '@react-navigation/native';
import { Container, Content } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import CommanBtnScreen from '../../components/CommanBtn';
import { FeatherIcon } from '../../theme/icons';
import FlexibleDates from './FlexibleDates';
import CircularDatePicker from './CircularDatePicker';
import MonthsSelection from './MonthsSelection';
import SearchLayout from '../../layouts/SearchLayout';
import LineSeperator from '../../components/LineSeperator';

const TripSlotSelection = () => {
    const navigation = useNavigation()
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'dates', title: 'Dates', active: true },
        { key: 'months', title: 'Months', active: false },
        { key: 'flexible', title: 'Flexible', active: false },
    ])

    const renderScene = SceneMap({
        dates: CalendarListScreen,
        months: MonthsSelection,
        flexible: FlexibleDates,

    });
    const renderButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <CommanBtnScreen
                    btnText="Skip"
                    commanBtnStyle={[styles.btnStyle, { backgroundColor: Colors.transparent, width: 90 }]}
                    commanBtnTextStyle={tStyles.cancelButtonTextStyle}

                    onBtnPress={() => navigation.goBack()}
                />
                <TouchableOpacity style={[styles.btnStyle, styles.flexRow, tStyles.btnStyle2]}>
                    <FeatherIcon name='search' size={18} color={Colors.white} />
                    <Text style={tStyles.commanBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderTabItems = React.useCallback((item, itemIndex) => {
        return (
            <TouchableOpacity onPress={() => setIndex(itemIndex)} style={[styles.tabButton, index == itemIndex && styles.activedtabButton]}>
                <Text style={[tStyles.tabButtonText, index == itemIndex && tStyles.activetabButtonText]}>{item?.title}</Text>
            </TouchableOpacity>
        )
    }, [index])


    const renderTabBar = React.useCallback((props) => {
        return (
            <View style={styles.tabsContainer}>

                {props.navigationState.routes.map((item, index) => (
                    renderTabItems(item, index)
                ))}

            </View>
        );
    }, [index])

    const navigateTo = (route) => navigation.navigate(route);
    return (


        // <View style={{
        //     flex: 1,
        //     padding: 10,
        // }}>

        <View style={{
            height: '90%',
            // flex: 1,
            // shadowColor: '#000',
            // shadowOffset: { width: 0, height: 2 },
            // elevation: 8,
            borderRadius: 15,
            // zIndex: 80000
            // border top radius
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
        }}>
            
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    swipeEnabled={false}
                    onIndexChange={setIndex}
                />
            {/* <LineSeperator style={styles.lineSeperator} /> */}
            {renderButtons()}
        </View>
        // </View>
    )
}

export default TripSlotSelection

const styles = StyleSheet.create({
    lineSeperator: {
        height: 1,
        backgroundColor: Colors.darkGray2,
        marginVertical: 10,
    },
    tabsContainer: {
        // flex row
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 5,
        backgroundColor: Colors.lightGray,
        borderRadius: 50,
        marginHorizontal: 15,
    },
    tabButton: {
        width: '33%',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 50,
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: Colors.white,
        // backgroundColor: Colors.white,
        // marginHorizontal: 5
    },
    activedtabButton: {
        backgroundColor: Colors.white,
    },

    buttonsContainer: {
        // width: '100%',
        backgroundColor: Colors.white,
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 'auto',
        backgroundColor: Colors.white,
        elevation: 7,
        shadowColor: Colors.black,
        shadowOffset: {
            width: '1rem',
            height: '1rem'
            // elevation: 7,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        // border top radius
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // zIndex: 9999999999999999

        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
    },
    btnStyle: {
        borderRadius: 50,
        width: 120,
        marginBottom: 0
    },


})

const tStyles = EStyleSheet.create({
    tabButtonText: {
        fontSize: Fonts.size.medium,
        ...Fonts.style.boldText,
        color: Colors.black,
    },
    headingTextStyle: {
        fontSize: Fonts.size.h3,
        color: Colors.black,
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