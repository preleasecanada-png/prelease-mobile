import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../theme'
import EStyleSheet from 'react-native-extended-stylesheet'
import { color } from 'react-native-reanimated'
import { fontSize } from 'styled-system'

const SeverintyPills = ({
    label,
    active
}) => {
    return (
        <View style={[styles.container, active && styles.active]}>
            <Text style={styles.textStyle}>{label}</Text>
        </View>
    )
}

export default SeverintyPills

const styles = EStyleSheet.create({
    container: {
        marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 5,
        backgroundColor: Colors.white,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        // shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2,
        // elevation: 2,
        // justifyContent: 'center', alignItems: 'center'
        // elevation: 2,
        // justifyContent: 'center', alignItems: 'center'
    },
    active:{
        backgroundColor: Colors.primaryLight
    },
    textStyle: {
        color: Colors.black,
        ...Fonts.style.textInputText,
        fontSize: Fonts.size.mediumNormal
    }
})