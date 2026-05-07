import EStyleSheet from "react-native-extended-stylesheet"
import { Colors, Fonts } from "../../theme"
import { alignItems, flexDirection, letterSpacing } from "styled-system"


const styles = EStyleSheet.create({
    iconDot:{
        fontSize: '12rem',
        color: Colors.green,
        marginLeft: '10rem',
        marginTop: '10rem',

    },
    listStyle:{

    },
    listItem: {
        marginBottom: 10,
        // padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemText: {
        color: Colors.black,
        letterSpacing: "0.25rem",
        lineHeight: '18rem',
        ...Fonts.style.normalText,
        fontSize: Fonts.size.medium,
        marginLeft: '10rem',
    },

})
export default styles