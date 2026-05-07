import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, Fonts } from '../../theme'
import { letterSpacing } from 'styled-system'

const styles = EStyleSheet.create({
    reviewContainer: {
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
    sliderReviewsText: {
        paddingLeft: '4rem',
        color: Colors.primary,
        fontSize: Fonts.size.mediumNormal,
        lineHeight: '15rem',
        ...Fonts.style.textInputText,
        letterSpacing: '0.5rem',
        underlineStyle: 'underline',
        textDecorationColor: Colors.black,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
})
export default styles