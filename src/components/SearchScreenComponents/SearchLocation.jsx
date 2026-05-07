import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { Colors, Fonts } from '../../theme'
import EStyleSheet from 'react-native-extended-stylesheet'
import { color } from 'react-native-reanimated'

const SearchLocation = ({
    leftText,
    rightText,
    navigateTo,
    onPress,
    style,
    disabled,
    selected,
}) => {
    return (
        <Card style={styles.container}>
            <Card.Content>
                <Pressable onPress={navigateTo} style={styles.flexRow}>
                    <Text style={styles.leftTextStyle}>{leftText}</Text>
                    <Text style={styles.rightTextStyle}>{rightText}</Text>
                </Pressable>
            </Card.Content>
        </Card>
    )
}

export default SearchLocation

const styles = EStyleSheet.create({
    container: {
        width: '90%',
        borderRadius: 50,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: Colors.white,
        elevation: 7

    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftTextStyle:{
        fontSize: Fonts.size.small,
        ...Fonts.style.textInputText,
        color: Colors.gratLightText
    },
    rightTextStyle:{
        fontSize: Fonts.size.small,
        ...Fonts.style.boldText,
        color: Colors.darkBlack
        
    }
})