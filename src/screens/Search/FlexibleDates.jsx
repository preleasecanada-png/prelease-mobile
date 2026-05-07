import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LineSeperator from '../../components/LineSeperator'
import { Colors, Fonts } from '../../theme'
import EStyleSheet from 'react-native-extended-stylesheet'
import CommanHeadingScreen from '../../components/CommanHeading'
import SeverintyPills from '../../components/SeverintyPills'
import { FeatherIcon } from '../../theme/icons'

const flexibleData =
{

    stayOfWeek: [
        {
            id: 1,
            label: 'Weekend',
            value: 'weekend',
            selected: false,
        },
        {
            id: 2,
            label: 'Week',
            value: 'week',
            selected: false,
        },
        {
            id: 3,
            label: 'Month',
            value: 'month',
            selected: true,
        },
    ],
    months: [
        {
            id: 1,
            label: 'January',
            value: 'january',
            year: '2024',
        },
        {
            id: 2,
            label: 'February',
            value: 'february',
            year: '2024',
        },
        {
            id: 3,
            label: 'March',
            value: 'march',
            year: '2024',
        },
        {
            id: 4,
            label: 'April',
            value: 'april',
            year: '2024',
        },
        {
            id: 5,
            label: 'May',
            value: 'may',
            year: '2024',
        },
        {
            id: 6,
            label: 'June',
            value: 'june',
            year: '2024',
        },
        {
            id: 7,
            label: 'July',
            value: 'july',
            year: '2024',
        },
        {
            id: 8,
            label: 'August',
            value: 'august',
            year: '2024',
        },
        {
            id: 9,
            label: 'September',
            value: 'september',
            year: '2024',
        },
        {
            id: 10,
            label: 'October',
            value: 'october',
            year: '2024',
        },
        {
            id: 11,
            label: 'November',
            value: 'november',
            year: '2024',
        },
        {
            id: 12,
            label: 'December',
            value: 'december',
            year: '2024',
        }


    ]
}



const FlexibleDates = () => {

    const renderAnyTime = ({ item }) => {
        return (
            <View style={styles.AnyTimeContainerStyle}>
                <FeatherIcon name='calendar' size={24} color={Colors.primary} />
                <Text style={tStyles.AnyTimeLabelStyle}>{item.label}</Text>
                <Text style={tStyles.AnyTimeYearStyle}>{item.year}</Text>
            </View>

        )
    }

    return (
        <View>

            <LineSeperator style={styles.LineSeperatorStyle} />
            <CommanHeadingScreen
                headingText
                commanHeadingContainerStyle={{ paddingHorizontal: 15, }}
                // commanHeadingTextStyle={tStyles.headingTextStyle}
                heading={"Stay for a week"}
            />

            <FlatList
                horizontal
                data={flexibleData.stayOfWeek}
                renderItem={({ item }) => {
                    return (
                        <SeverintyPills label={item.label} active={item.selected} />
                    )
                }}
                showsHorizontalScrollIndicator={false}
            />

            <LineSeperator style={styles.LineSeperatorStyle} />

            <CommanHeadingScreen
                headingText
                commanHeadingContainerStyle={{ paddingHorizontal: 15, }}
                // commanHeadingTextStyle={tStyles.headingTextStyle}
                heading={"Go Any Where"}
            />


            <FlatList
                horizontal
                data={flexibleData.months}
                renderItem={renderAnyTime}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}

export default FlexibleDates

const styles = StyleSheet.create({

    LineSeperatorStyle: {
        backgroundColor: Colors.darkGray2,
        height: 1,
        marginVertical: 20
    },
    AnyTimeContainerStyle: {
        width: 100,
        height: 100,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.primary,
        borderRadius: 15,
        marginHorizontal: 10
    }
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
    AnyTimeLabelStyle: {
        marginTop: 15,
        fontSize: Fonts.size.regular,
        color: Colors.black,
        ...Fonts.style.boldText,


    },
    AnyTimeYearStyle: {
        fontSize: Fonts.size.medium,
        color: Colors.black,
        ...Fonts.style.boldText,
    }
})