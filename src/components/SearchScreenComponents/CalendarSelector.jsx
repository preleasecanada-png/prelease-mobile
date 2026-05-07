import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Card } from "react-native-paper";
import { Colors, Fonts } from "../../theme";
import CommanBtnScreen from "../CommanBtn";
import { useNavigation } from "@react-navigation/native";
import { FeatherIcon } from "../../theme/icons";
import { TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Calendar } from "react-native-calendars";
import CalendarListScreen from "./CalendarListScreen";



const CalendarSelector = () => {
    const navigation = useNavigation();
    const renderButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <CommanBtnScreen
                    btnText="Clear All"
                    commanBtnStyle={[styles.btnStyle, { backgroundColor: Colors.transparent, }]}
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
        // <Card style={styles.container}>
        //     <Card.Content>
        <>
            <CalendarListScreen />
            {renderButtons()}
        </>
        //     </Card.Content>
        // </Card>
    )
};
export default CalendarSelector;

const styles = EStyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        backgroundColor: Colors.white,
        // marginTop: 100,
    },
    buttonsContainer: {
        width: '100%',
        paddingHorizontal: 20, paddingVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 'auto',
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

});