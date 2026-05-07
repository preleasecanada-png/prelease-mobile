import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { navigate } from '../../navigation/ReduxNavigation'
import CommanHeadingScreen from '../CommanHeading'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, Fonts } from '../../theme'
import { color } from 'react-native-reanimated'

const SummaryList = ({
    heading,
    data
}) => {
    return (
        <View style={{flex: 1}}>
            <CommanHeadingScreen
                headingText
                heading={heading}
                commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
                navigation={navigate}
            />
            <View style={styles.summaryList}>
                {data.map((item, index) => (
                    <View key={index} style={styles.summaryItem}>
                        <Text style={styles.summaryItemText}>{item.title}</Text>
                        <Text style={styles.summaryItemValue}>{item.value}</Text>
                    </View>
                ))}
            </View>

        </View>
    )
}

export default SummaryList

const styles = EStyleSheet.create({
    summaryItem: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10
    },
    summaryItemText: {
        fontSize: Fonts.size.medium,
        ...Fonts.style.normalText,
        color: Colors.opacityBlackText
    },
    summaryItemValue: {
        fontSize: Fonts.size.medium,
        ...Fonts.style.boldText,
        color: Colors.black
    },
})