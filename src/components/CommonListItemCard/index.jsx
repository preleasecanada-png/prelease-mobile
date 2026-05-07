import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card, List } from 'react-native-paper'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, Fonts } from '../../theme';
import Accordion from '../Accordion';
import WhereTo from '../SearchScreenComponents/WhereTo';


const CommonListItemCard = ({
    leftText,
    rightText,
    containerStyle,
    content,
    animatedHeight,
    contentTitle,
    expanded,
    onPress,
    handleClose
}) => {


    const renderLeftTitle = () => (
        <Text style={styles.leftTextStyle}>{leftText}</Text>
    );
    const renderRightTitle = () => (
        <Text style={styles.rightTextStyle}>{rightText}</Text>
    );

    return (

        <Accordion
            leftText={leftText}
            containerStyle={containerStyle}
            renderLeftTitle={renderLeftTitle}
            renderRightTitle={renderRightTitle}
            animatedHeight={animatedHeight}
            contentTitle={contentTitle}
            expanded={expanded}
            onPress={onPress}
            handleClose={handleClose}
        >
            {content}
        </Accordion>
    )
}

export default CommonListItemCard

const styles = EStyleSheet.create({
    container: {
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: Colors.white,
        elevation: 8,
        padding: 0,
        margin: 0,

    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftTextStyle: {
        fontSize: Fonts.size.small,
        ...Fonts.style.textInputText,
        color: Colors.gratLightText
    },
    rightTextStyle: {
        fontSize: Fonts.size.small,
        ...Fonts.style.boldText,
        color: Colors.darkBlack

    }
})