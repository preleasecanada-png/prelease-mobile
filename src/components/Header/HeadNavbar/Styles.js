import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Fonts } from "../../../theme";
import { isIphoneX } from "../../../libs/Utils";
import { alignSelf, backgroundColor, borderRadius, borderWidth, flex, flexDirection, left, padding, paddingTop, zIndex } from "styled-system";
import { StatusBar } from "react-native";

const styles = EStyleSheet.create({
    postitionRelative:{
        borderWidth: 1, borderColor: Colors.gray, borderRadius: 50,
        padding: 3,
        zIndex: 99
    },
    closeButton: {
        position: "absolute",
        top: StatusBar.currentHeight-5,
        left: 20,
        borderWidth: 1, borderColor: Colors.gray, borderRadius: 50,
        padding: 3,
        zIndex: 99,
        backgroundColor: Colors.white,
        elevation: 2,
        // shadow
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2,

    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight-10,
        // backgroundColor: Colors.white,


    },

    tabsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '100%',
        paddingHorizontal: '15rem',
        alignSelf: 'center',
        // borderBottomWidth: '2rem',
        // borderColor: Colors.gray,
    },

    tabButton: {
        // flex: 1,
        // paddingHorizontal: '20rem',
        // borderWidth: isIphoneX ? 1 : 0,
        // borderColor: Colors.opacityBlack_50,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 50,
        // padding: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 5,


    },

    tabButtonText: {
        fontSize: Fonts.size.medium,
        '@media ios': {
            ...Fonts.style.boldText
        },
        '@media android': {
            ...Fonts.style.boldText
        },
        color: Colors.opacityBlackText

    },

    activedtabButton: {
        // backgroundColor: Colors.primary,


    },
    activetabButtonText: {
        color: Colors.black,
        borderBottomWidth: isIphoneX ? 2 : 0,
        borderColor: Colors.black,

    },

})

export default styles;