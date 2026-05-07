import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { Colors, Fonts, Images } from '../../theme'
import CommanHeadingScreen from '../CommanHeading'
import CounterList from '../CounterList'
import CommanBtnScreen from '../CommanBtn'
import { useNavigation } from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { bottom, flex, fontSize, height, position, width } from 'styled-system'
import { TouchableOpacity } from 'react-native'
import { FeatherIcon } from '../../theme/icons'

const whoIsComingData = [
    {
        id: 1,
        minasImage: Images.MinasIcon,
        pluseImage: Images.PluseIcon,
        text: 'Adults',
        desc: 'Age 13 or above'
    },
    {
        id: 2,
        minasImage: Images.MinasIcon,
        pluseImage: Images.PluseIcon,
        text: 'Children',
        desc: 'Ages 2-12'

    },
    {
        id: 3,
        minasImage: Images.MinasIcon,
        pluseImage: Images.PluseIcon,
        text: 'Infants',
        desc: 'Under 2'
    },
    {
        id: 4,
        minasImage: Images.MinasIcon,
        pluseImage: Images.PluseIcon,
        text: 'Pets',
        desc: 'Bring a service animal?'
    }
]


const WhoIsComing = () => {
    const navigation = useNavigation();

    const renderButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <CommanBtnScreen
                    btnText="Clear All"
                    commanBtnStyle={[styles.btnStyle, { backgroundColor: Colors.transparent, width: 100 }]}
                    commanBtnTextStyle={styles.cancelButtonTextStyle}

                    onBtnPress={() => navigation.navigate('AddPaymentMathod')}
                />
                <TouchableOpacity style={[styles.btnStyle, styles.flexRow, styles.btnStyle2]}>
                    <FeatherIcon name='search' size={18} color={Colors.white} />
                    <Text style={styles.commanBtnText}>Search</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (

        <View style={{}}>
            <View style={styles.container}>
                {/* <CommanHeadingScreen
                        headingText
                        heading="Who’s Coming?"
                        commanHeadingContainerStyle={styles.propertyHeadingStyle}
                        commanHeadingTextStyle={styles.propertyHeadingTextStyle}
                    /> */}
                <CounterList data={whoIsComingData} />
            </View>
            {/* {renderButtons()} */}
        </View>
    )
}

export default WhoIsComing

const styles = EStyleSheet.create({
    container: {
        // borderRadius: 50,
        marginVertical: 10,
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        height: "100%",

    },
    propertyHeadingTextStyle: {
        fontSize: Fonts.size.h3
    },
    buttonsContainer: {
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: '22%',
        position: 'absolute',
        bottom: '12%',

        // height: 100,
        // elevation: 2,
        // shadowColor: Colors.black,
        // shadowOffset: {
        //     width: '1rem',
        //     height: '1rem'
        //     // elevation: 7,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 10,
        // border top radius
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
    },
    btnStyle: {
        borderRadius: 50,
        width: 120
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