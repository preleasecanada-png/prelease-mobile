import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Colors, Images } from '../../theme'
import styles from './Style'

const Raiting = ({
    ratingText = 4.0,
    icon = Images.StarActive,
    color = Colors.black,
    iconStyle,
    textStyle,

}) => {
    return (
        <View style={styles.sliderRatingContainer}>
            <Image
                source={icon}
                resizeMode="contain"
                style={[styles.sliderRatingStarImg, iconStyle, { tintColor: color }]}
            />
            <Text style={[styles.sliderRatingStarText, textStyle, { color: color }]}>{ratingText}.0</Text>
        </View>
    )
}

export default Raiting