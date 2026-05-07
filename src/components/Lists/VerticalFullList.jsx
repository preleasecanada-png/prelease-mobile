import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Colors, Fonts, Icons } from '../../theme'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import EStyleSheet from 'react-native-extended-stylesheet';
import { fontSize, margin } from 'styled-system'
import Raiting from '../Rating'
import HeaderMain from '../HeaderMain'

const VerticalFullList = ({
    data,
    onCategoryClick
}) => {

    const renderItem = ({ item }) => (
        <Pressable style={{ marginBottom: 10 }} onPress={() => onCategoryClick(item)} >
            <ImageBackground imageStyle={{ borderRadius: 10 }} source={item?.image} style={{ width: "100%", height: 250, borderRadius: 10, }}>
                {/* <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingTop: 10 }}>
                    <View style={{ borderRadius: 50, backgroundColor: Colors.opacityWhite, padding: 8, justifyContent: "center", alignItems: "center" }}>
                        <Image resizeMode='contain' source={Icons?.heart_outlined} style={{ width: 20, height: 20 }} />
                    </View>
                    <View style={{ borderRadius: 50, backgroundColor: Colors.opacityWhite, padding: 8, justifyContent: "center", alignItems: "center" }}>
                        <Image resizeMode='contain' source={Icons?.share} style={{ width: 20, height: 20 }} />
                    </View>
                </View> */}
                <HeaderMain
                    isVectorIconLeft={false}
                    leftIcon={Icons?.heart_outlined}
                    centerImage={false}
                    rightIcon={Icons?.share}
                    isVectorIconRight={false}
                    leftIconPress={() => { }}
                    rightIconPress={() => { }}





                />
            </ImageBackground>

            <View style={styles.sliderLoacationText}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.sliderHeading}>{item.title}</Text>
                    <Raiting ratingText={item?.ratingText} />
                </View>
                <Text style={styles.sliderPeregraph}>{item.text}</Text>
                <Text style={styles.sliderPeregraph}>{item.date}</Text>
                <Text style={styles.noOfGuest}>{item.noOfGuestPrice}</Text>
            </View>
        </Pressable>
    )

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                vertical={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    )
}

export default VerticalFullList
const styles = EStyleSheet.create({
    sliderLoacationText: {
        // marginTop: 10,

    },
    sliderHeading: {
        fontSize: '14rem',
        ...Fonts.style.boldText,
        marginTop: 8,
    },
    sliderPeregraph: {
        fontSize: Fonts.size.small,
        color: Colors.gratLightText,
        ...Fonts.style.textInputText,

        marginTop: 5,

    },
    noOfGuest: {
        fontSize: Fonts.size.medium,
        color: Colors.black,
        marginTop: 5,
        ...Fonts.style.boldText,
    },

    sliderRatingContainer: {
        marginTop: 8,
        // position: 'absolute',
        // right: '15rem',
        // top: '15rem',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: Colors.lighterBgBlack,
        paddingHorizontal: '5rem',
        // paddingVertical: '3.5rem',
        borderRadius: '4rem'
    },
    sliderRatingStarImg: {
        width: '12rem',
        height: '12rem'
    },
    sliderRatingStarText: {
        paddingLeft: '4rem',
        color: Colors.black,
        fontSize: Fonts.size.mediumNormal,
        lineHeight: '15rem',
        ...Fonts.style.textInputText,
        underlineStyle: 'underline',
        textDecorationColor: Colors.black,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },

})