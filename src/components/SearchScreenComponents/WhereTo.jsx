import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { Colors, Fonts, Images } from '../../theme'
import CommanHeadingScreen from '../CommanHeading'
import CounterList from '../CounterList'
import CommanBtnScreen from '../CommanBtn'
import { useNavigation } from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet'
import CommonListItemCard from '../CommonListItemCard'
import { borderColor, borderRadius, borderWidth, flex, height, marginLeft, marginRight } from 'styled-system'
import SearchLayout from '../../layouts/SearchLayout'
import CommonSearchInput from '../CommonSearchInput/Index'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet'
import { FeatherIcon } from '../../theme/icons'


export const SearchInputNavigator = () => {
    const navigation = useNavigation()
    return (
        <Pressable style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate("SearchInput")}>
            <CommonSearchInput
                surfaceStyle={{ backgroundColor: Colors.white }}
                inputStyle={[styles.inputStyle]}
                placeholder={"Search Destinations"}
                disabled={true}
            // surfaceStyle={containerStyle}
            // onChangeText={(text) => setInput(text)}
            />
        </Pressable>
    )
}

const areas = [
    {
        label: 'I am Flexible',
        value: 'flexible',
        id: 1,
        image: Images.area3,
    },
    {
        label: 'Toronto',
        value: 'toronto',
        id: 2,
        image: Images.area1,
    },
    {
        label: 'Montreal',
        value: 'montreal',
        id: 3,
        image: Images.area2,
    },
]

const WhereTo = () => {
    const navigation = useNavigation();
    const [selectedArea, setSelectedArea] = React.useState(1)


    const renderAnyTime = React.useCallback(({ item }) => {
        return (
            <View style={styles.destinationItems}>
                <View style={[styles.areaImageView, selectedArea == item?.id && { borderColor: Colors.black }]}>
                    <Image source={item?.image} style={styles.areaImageStyle} />
                </View>
                <Text style={[styles.areaItemsText, selectedArea == item?.id && styles.activeAreaItemsText]}>{item.label}</Text>
                {/* <Text style={styles.AnyTimeYearStyle}>{item.year}</Text> */}
            </View>

        )
    }, [selectedArea])


    return (

        <>
            <View style={styles.container}>
                {/* <CommanHeadingScreen
                    headingText
                    heading="Where To?"
                    commanHeadingContainerStyle={styles.propertyHeadingStyle}
                    commanHeadingTextStyle={styles.propertyHeadingTextStyle}
                /> */}
                <SearchInputNavigator />
                {/* <SearchLocation
                            listData={suggestionsListData}
                            placeholderText={"Search Desinations"}
                            containerStyle={{
                                borderColor: Colors.lightBlackTextOpacity,
                                borderWidth: 1
                            }}


                        /> */}

                <FlatList
                    horizontal
                    data={areas}
                    renderItem={renderAnyTime}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{marginLeft: 10}}
                />
            </View>



            {/* <CommonListItemCard
                leftText={"When"}
                rightText={"Any Week"}
                containerStyle={{
                    borderRadius: 8
                }}
            />

            <CommonListItemCard
                leftText={"Who"}
                rightText={"Add Guest"}
                containerStyle={{
                    borderRadius: 8
                }}
            /> */}
        </>
    )
}

export default WhereTo

const styles = EStyleSheet.create({
    container: {
        borderRadius: 10,
        // paddingHorizontal: 7,
        // marginVertical: 10,
        // backgroundColor: Colors.white,
        // elevation: 7

    },
    inputStyle: {
        borderColor: Colors.darkGray2,
        borderWidth: 1

    },
    contentStyle: {
        backgroundColor: Colors.white,

    },
    destinationItems: {

        paddingVertical: 10,

    },
    areaImageView: {
        backgroundColor: Colors.lightGray,
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.darkGray,
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_WIDTH * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15

    },
    areaImageStyle: {
        width: WINDOW_WIDTH * 0.20,
        height: WINDOW_WIDTH * 0.20,
        resizeMode: 'center',
        // aspectRatio: 16/16

    },
    areaItemsText: {
        fontSize: Fonts.size.medium,
        color: Colors.opacityBlackText,
        ...Fonts.style.textInputText,
        marginLeft: 10,
        marginTop: 7,
    },
    activeAreaItemsText: {
        color: Colors.black,
        ...Fonts.style.boldText,
    },
    buttonsContainer: {
        paddingHorizontal: 20, paddingVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnStyle: {
        borderRadius: 50,
        // width: 100
    },
    cancelButtonTextStyle: {
        color: Colors.black,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: Colors.black,
        fontSize: Fonts.size.medium,
        ...Fonts.style.boldText

    },
})